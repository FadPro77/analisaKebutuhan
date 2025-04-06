const pengeluaranRepository = require("../repositories/pengeluaran");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPengeluaran = async (keterangan, jumlah) => {
  const pengeluaran = await pengeluaranRepository.getPengeluaran(
    keterangan,
    jumlah
  );
  if (!pengeluaran.length) {
    throw new NotFoundError("Pengeluaran tidak ditemukan");
  }
  return pengeluaran;
};

exports.getPengeluaranById = async (id) => {
  const pengeluaran = await pengeluaranRepository.getPengeluaranById(id);

  if (!pengeluaran) {
    throw new NotFoundError("Pengeluaran is Not Found!");
  }

  return pengeluaran;
};

exports.createPengeluaran = async (data) => {
  const pengeluaran = await pengeluaranRepository.createPengeluaran(data);

  await prisma.saldo.create({
    data: {
      tipe: "pengeluaran",
      keterangan: pengeluaran.keterangan,
      jumlah: pengeluaran.jumlah,
      pengeluaran_id: pengeluaran.id,
    },
  });

  return pengeluaran;
};

exports.updatePengeluaran = async (id, data) => {
  const existingPengeluaran = await pengeluaranRepository.getPengeluaranById(
    id
  );
  if (!existingPengeluaran) {
    throw new NotFoundError("Pengeluaran is Not Found!");
  }

  data = {
    ...existingPengeluaran,
    ...data,
  };

  const updatedPengeluaran = await pengeluaranRepository.updatePengeluaran(
    id,
    data
  );
  if (!updatedPengeluaran) {
    throw new InternalServerError(["Failed to update pengeluaran!"]);
  }

  await prisma.saldo.updateMany({
    where: { pengeluaran_id: Number(id) },
    data: {
      jumlah: updatedPengeluaran.jumlah,
      keterangan: updatedPengeluaran.keterangan,
    },
  });

  return updatedPengeluaran;
};

exports.deletePengeluaran = async (id) => {
  const existingPengeluaran = await pengeluaranRepository.getPengeluaran(id);
  if (!existingPengeluaran) {
    throw new NotFoundError("Pengeluaran is Not Found!");
  }

  await prisma.saldo.deleteMany({
    where: {
      pengeluaran_id: Number(id),
    },
  });

  const deletedPengeluaran = await pengeluaranRepository.deletePengeluaran(id);
  if (!deletedPengeluaran) {
    throw new InternalServerError(["Failed to delete spec!"]);
  }

  return existingPengeluaran;
};
