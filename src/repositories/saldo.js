const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getSaldo = async (
  tipe,
  jumlah,
  keterangan,
  tanggal,
  payment_id,
  pengeluaran_id
) => {
  let query = {
    where: {},
  };

  let orQuery = [];
  if (tipe) {
    orQuery.push({
      tipe: { contains: tipe, mode: "insensitive" },
    });
  }

  if (jumlah) {
    orQuery.push({
      jumlah: Number(jumlah),
    });
  }

  if (keterangan) {
    orQuery.push({
      keterangan: { contains: keterangan, mode: "insensitive" },
    });
  }

  if (tanggal) {
    const dateFilter = new Date(tanggal);
    if (!isNaN(dateFilter.getTime())) {
      query.where.tanggal = { gte: dateFilter };
    }
  }

  if (payment_id) {
    orQuery.push({
      payment_id: Number(payment_id),
    });
  }

  if (pengeluaran_id) {
    orQuery.push({
      pengeluaran_id: Number(pengeluaran_id),
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedSaldo = await prisma.saldo.findMany(query);

  const serializedSaldo = JSONBigInt.stringify(searchedSaldo);
  return JSONBigInt.parse(serializedSaldo);
};

exports.getSaldoById = async (id) => {
  const saldo = await prisma.saldo.findUnique({
    where: { id: Number(id) },
  });

  const serializedSaldo = JSONBigInt.stringify(saldo);
  return JSONBigInt.parse(serializedSaldo);
};

exports.createSaldo = async (data) => {
  const newSaldo = await prisma.saldo.create({
    data,
  });

  const serializedSaldo = JSONBigInt.stringify(newSaldo);
  return JSONBigInt.parse(serializedSaldo);
};

exports.updateSaldo = async (id, data) => {
  const updatedSaldo = await prisma.saldo.update({
    where: {
      id: Number(id),
    },
    data: {
      tipe: data.tipe,
      jumlah: data.jumlah,
      keterangan: data.keterangan,
    },
  });

  const serializedSaldo = JSONBigInt.stringify(updatedSaldo);
  return JSONBigInt.parse(serializedSaldo);
};

exports.deleteSaldo = async (id) => {
  const deletedSaldo = await prisma.saldo.delete({
    where: { id: Number(id) },
  });
  return deletedSaldo;
};
