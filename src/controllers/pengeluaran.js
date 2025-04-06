const { successResponse } = require("../utils/response");
const pengeluaranService = require("../services/pengeluaran");

exports.getPengeluaran = async (req, res, next) => {
  const data = await pengeluaranService.getPengeluaran(
    req.query?.keterangan,
    req.query?.jumlah
  );

  successResponse(res, data);
};

exports.getPengeluaranById = async (req, res, next) => {
  const data = await pengeluaranService.getPengeluaranById(req.params.id);
  successResponse(res, data);
};

exports.createPengeluaran = async (req, res, next) => {
  const data = await pengeluaranService.createPengeluaran(req.body);
  successResponse(res, {
    message: "Pengeluaran created successfully",
    data,
  });
};

exports.updatePengeluaran = async (req, res, next) => {
  const { id } = req.params;

  const data = await pengeluaranService.updatePengeluaran(id, req.body);
  successResponse(res, {
    message: "Pengeluaran Updated successfully!",
    data,
  });
};

exports.deletePengeluaran = async (req, res, next) => {
  const { id } = req.params;
  const data = await pengeluaranService.deletePengeluaran(id);
  successResponse(res, {
    message: "Pengeluaran deleted successfully",
    data,
  });
};
