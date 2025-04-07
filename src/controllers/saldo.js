const { successResponse } = require("../utils/response");
const saldoService = require("../services/saldo");

exports.getSaldo = async (req, res, next) => {
  const result = await saldoService.getSaldo(
    req.query?.tipe,
    req.query?.jumlah,
    req.query?.keterangan,
    req.query?.tanggal,
    req.query?.payment_id,
    req.query?.pengeluaran_id
  );

  successResponse(res, result);
};

exports.getSaldoById = async (req, res, next) => {
  const data = await saldoService.getSaldoById(req.params.id);
  successResponse(res, data);
};

exports.createSaldo = async (req, res, next) => {
  const data = await saldoService.createSaldo(req.body);
  successResponse(res, {
    message: "Saldo Created successfully!",
    data,
  });
};

exports.updateSaldo = async (req, res, next) => {
  const { id } = req.params;
  const data = await saldoService.updateSaldo(id, req.body);
  successResponse(res, {
    message: "Saldo updated successfully",
    data,
  });
};

exports.deleteSaldo = async (req, res, next) => {
  const data = await saldoService.deleteSaldo(req.params.id);

  successResponse(res, {
    message: "Saldo Deleted successfully!",
    data,
  });
};
