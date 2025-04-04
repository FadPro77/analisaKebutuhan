const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getPayment = async (
  pesanan_id,
  metode,
  status,
  transaksi_id,
  jumlah,
  tanggal
) => {
  let query = {
    include: {
      pesanan: {
        select: {
          status: true,
          created_at: true,
          users: {
            select: {
              first_name: true,
              last_name: true,
              phone: true,
              email: true,
            },
          },
          pesanan_items: {
            select: {
              jumlah: true,
              subtotal: true,
              menu: {
                select: {
                  nama: true,
                  kategori: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  };

  let orQuery = [];

  if (metode) {
    orQuery.push({
      metode: { contains: metode, mode: "insensitive" },
    });
  }

  if (transaksi_id) {
    orQuery.push({
      transaksi_id: Number(transaksi_id),
    });
  }

  if (jumlah) {
    orQuery.push({
      jumlah: Number(jumlah),
    });
  }

  if (tanggal) {
    const dateFilter = new Date(tanggal);
    if (!isNaN(dateFilter.getTime())) {
      query.where.tanggal = { gte: dateFilter };
    }
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedPayment = await prisma.payment.findMany(query);

  const serializedPayment = JSONBigInt.stringify(searchedPayment);
  return JSONBigInt.parse(serializedPayment);
};

exports.getPaymentById = async (id) => {
  const payment = await prisma.payment.findUnique({
    where: { id: Number(id) },
  });

  const serializedPayment = JSONBigInt.stringify(payment);
  return JSONBigInt.parse(serializedPayment);
};

exports.createPaymentManual = async (data) => {
  const newPaymentManual = await prisma.payment.create({
    data,
  });

  const serializedPaymentManual = JSONBigInt.stringify(newPaymentManual);
  return JSONBigInt.parse(serializedPaymentManual);
};

exports.createPaymentMidtrans = async ({
  pesanan_id,
  jumlah,
  metode,
  status,
  transaksi_id,
  snap_token,
  midtrans_order_id,
}) => {
  const newPaymentMidtrans = await prisma.payment.create({
    data: {
      pesanan_id,
      metode,
      status,
      jumlah,
      transaksi_id,
      snap_token,
      midtrans_order_id,
    },
  });

  const serializedPaymentMidtrans = JSONBigInt.stringify(newPaymentMidtrans);
  return JSONBigInt.parse(serializedPaymentMidtrans);
};
