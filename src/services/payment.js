const paymentRepository = require("../repositories/payment");
const midtransClient = require("midtrans-client");

const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

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
  return paymentRepository.createPaymentManual(data);
};

exports.createMidtransPayment = async ({ pesanan_id, jumlah, user }) => {
  const order_id = `ORDER-${pesanan_id}-${Date.now()}`;

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id,
      gross_amount: jumlah,
    },
    customer_details: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
    },
  });

  const { token, redirect_url } = transaction;

  const payment = await prisma.payment.create({
    data: {
      pesanan_id,
      metode: "midtrans",
      status: "pending",
      jumlah,
      transaksi_id: order_id, // optional, bisa custom
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
