const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getPengeluaran = async (keterangan, jumlah) => {
  let query = {
    where: {},
  };

  let orQuery = [];
  if (keterangan) {
    orQuery.push({
      keterangan: { contains: keterangan, mode: "insensitive" },
    });
  }

  if (jumlah) {
    orQuery.push({
      jumlah: Number(jumlah),
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedPengeluaran = await prisma.pengeluaran.findMany(query);

  const serializedPengeluaran = JSONBigInt.stringify(searchedPengeluaran);
  return JSONBigInt.parse(serializedPengeluaran);
};

exports.getPengeluaranById = async (id) => {
  const pengeluaran = await prisma.pengeluaran.findUnique({
    where: { id: Number(id) },
  });

  const serializedPengeluaran = JSONBigInt.stringify(pengeluaran);
  return JSONBigInt.parse(serializedPengeluaran);
};

exports.createPengeluaran = async (data) => {
  const newPengeluaran = await prisma.pengeluaran.create({
    data,
  });

  const serializedPengeluarans = JSONBigInt.stringify(newPengeluaran);
  return JSONBigInt.parse(serializedPengeluarans);
};

exports.updatePengeluaran = async (id, data) => {
  const updatedPengeluaran = await prisma.pengeluaran.update({
    where: {
      id: Number(id),
    },
    data: {
      keterangan: data.keterangan,
      jumlah: Number(data.jumlah),
    },
  });

  const serializedPengeluaran = JSONBigInt.stringify(updatedPengeluaran);
  return JSONBigInt.parse(serializedPengeluaran);
};

exports.deletePengeluaran = async (id) => {
  const deletedPengeluaran = await prisma.pengeluaran.delete({
    where: { id: Number(id) },
  });
  return deletedPengeluaran;
};
