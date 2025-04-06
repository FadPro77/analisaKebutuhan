const paymentRepository = require("../repositories/payment");
const midtransClient = require("midtrans-client");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();
const { snap } = require("../utils/midtrans");
const { imageUpload } = require("../utils/image-kit");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.getPayment = async (metode, status, jumlah, tanggal) => {
  const payment = await paymentRepository.getPayment(
    metode,
    status,
    jumlah,
    tanggal
  );
  if (!payment.length) {
    throw new NotFoundError("No payment found.");
  }
  return payment;
};

exports.getPaymentById = async (id) => {
  const payment = await paymentRepository.getPaymentById(id);

  if (!payment) {
    throw new NotFoundError("Payment is Not Found!");
  }

  return payment;
};

exports.createPaymentManual = async (data) => {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: data.pesanan_id },
    include: {
      pesanan_items: true,
    },
  });

  if (!pesanan) throw new NotFoundError("Pesanan tidak ditemukan");

  const existingPayment = await prisma.payment.findFirst({
    where: { pesanan_id: data.pesanan_id },
  });

  if (existingPayment) {
    throw new BadRequestError("Pembayaran untuk pesanan ini sudah dibuat.");
  }

  const jumlah = pesanan.pesanan_items.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const transaksi_id = `TUNAI-${data.pesanan_id}-${uuidv4()}`;

  const payment = await paymentRepository.createPaymentManual({
    ...data,
    jumlah,
    transaksi_id,
  });

  // Buat entri saldo setelah payment berhasil
  await prisma.saldo.create({
    data: {
      tipe: "pembayaran",
      keterangan: `pembayaran (${data.pesanan_id}) tunai`,
      jumlah,
      payment_id: payment.id,
    },
  });

  return payment;
};

exports.createMidtransPayment = async ({ pesanan_id }) => {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: pesanan_id },
    include: {
      users: true,
      pesanan_items: true,
    },
  });

  if (!pesanan) throw new NotFoundError("Pesanan tidak ditemukan");

  const jumlah = pesanan.pesanan_items.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const order_id = `ORDER-${pesanan_id}-${Date.now()}`;

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id,
      gross_amount: jumlah,
    },
    customer_details: {
      first_name: pesanan.users.first_name,
      last_name: pesanan.users.last_name || "",
      email: pesanan.users.email || "",
      phone: pesanan.users.phone,
    },
  });

  const { token, redirect_url } = transaction;

  const payment = await prisma.payment.create({
    data: {
      pesanan_id,
      metode: "midtrans",
      status: "pending",
      jumlah,
      transaksi_id: order_id,
      snap_token: token,
      midtrans_order_id: order_id,
    },
  });

  return {
    snap_token: token,
    redirect_url,
    payment,
  };
};

exports.createMidtransNotification = async (notification) => {
  try {
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const statusResponse = await core.transaction.notification(notification);
    const { order_id, transaction_status, fraud_status } = statusResponse;

    let status = "pending";
    if (transaction_status === "capture") {
      status = fraud_status === "challenge" ? "challenge" : "success";
    } else if (transaction_status === "settlement") {
      status = "success";
    } else if (["cancel", "deny", "expire"].includes(transaction_status)) {
      status = "failed";
    }

    await prisma.payment.updateMany({
      where: { midtrans_order_id: order_id },
      data: { status },
    });

    if (status === "success") {
      const payment = await prisma.payment.findFirst({
        where: { midtrans_order_id: order_id },
      });

      if (payment) {
        await prisma.saldo.create({
          data: {
            tipe: "pembayaran",
            keterangan: `pembayaran (${payment.pesanan_id}) daring`,
            jumlah: payment.jumlah,
            payment_id: payment.id,
          },
        });
      }
    }

    const split = order_id.split("-");
    const idPesanan = Number(split[1]);

    if (!isNaN(idPesanan)) {
      await prisma.pesanan.updateMany({
        where: { id: idPesanan },
        data: { status },
      });
    }
  } catch (err) {
    console.error("Midtrans Notification Error:", err);
    throw new InternalServerError("Gagal memproses notifikasi Midtrans");
  }
};
