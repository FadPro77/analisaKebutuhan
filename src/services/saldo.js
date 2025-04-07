const saldoRepository = require("../repositories/saldo");
const paymentRepository = require("../repositories/payment");
const pengeluaranRepository = require("../repositories/pengeluaran");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getSaldo = async (
  tipe,
  jumlah,
  keterangan,
  tanggal,
  payment_id,
  pengeluaran_id
) => {
  const saldo = await saldoRepository.getSaldo(
    tipe,
    jumlah,
    keterangan,
    tanggal,
    payment_id,
    pengeluaran_id
  );
  if (!saldo.length) {
    throw new NotFoundError("No saldo found with the provided criteria.");
  }

  const totalSaldo = saldo.reduce((acc, item) => {
    if (item.tipe === "pembayaran" || item.tipe === "pemasukan") {
      return acc + item.jumlah;
    } else if (item.tipe === "pengeluaran") {
      return acc - item.jumlah;
    } else {
      return acc;
    }
  }, 0);

  return {
    total: totalSaldo,
    data: saldo,
  };
};

exports.getSaldoById = async (id) => {
  const saldo = await saldoRepository.getSaldoById(id);

  if (!saldo) {
    throw new NotFoundError("Saldo is Not Found!");
  }

  return saldo;
};

exports.createSaldo = async (data) => {
  return saldoRepository.createSaldo(data);
};

exports.updateSaldo = async (id, data, file) => {
  const existingSaldo = saldoRepository.getSaldoById(id);
  if (!existingSaldo) {
    throw new NotFoundError("Saldo is Not Found!");
  }

  data = {
    ...existingSaldo,
    ...data,
  };

  const updatedSaldo = saldoRepository.updateSaldo(id, data);
  if (!updatedSaldo) {
    throw new InternalServerError(["Failed to update saldo!"]);
  }

  return updatedSaldo;
};

exports.deleteSaldo = async (id) => {
  const existingSaldo = await saldoRepository.getSaldoById(id);
  if (!existingSaldo) {
    throw new NotFoundError("Saldo is Not Found!");
  }

  if (existingSaldo.payment_id) {
    const deletePayment = await paymentRepository.deletePayment(
      existingSaldo.payment_id
    );
    if (!deletePayment) {
      throw new InternalServerError(["Failed to delete payment"]);
    }
  }

  if (existingSaldo.pengeluaran_id) {
    const deletePengeluaran = await pengeluaranRepository.deletePengeluaran(
      existingSaldo.pengeluaran_id
    );
    if (!deletePengeluaran) {
      throw new InternalServerError(["Failed to delete pengeluaran"]);
    }
  }

  const deletedSaldo = await saldoRepository.deleteSaldo(id);
  if (!deletedSaldo) {
    throw new InternalServerError(["Failed to delete saldo!"]);
  }

  return existingSaldo;
};
