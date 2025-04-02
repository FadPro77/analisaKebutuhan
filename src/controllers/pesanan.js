const { successResponse } = require("../utils/response");
const pesananService = require("../services/pesanan");

exports.getPesanan = async (req, res, next) => {
  const data = await pesananService
    .getPesanan
    // req.query?.nama,
    // req.query?.harga,
    // req.query?.kategori
    ();

  successResponse(res, data);
};

exports.getPesananById = async (req, res, next) => {
  const data = await pesananService.getPesananById(req.params.id);
  successResponse(res, data);
};

exports.createPesanan = async (req, res, next) => {
  try {
    const data = await pesananService.createPesanan(req.body);
    successResponse(res, {
      message: "Pesanan berhasil ditambahkan!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
