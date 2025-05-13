const { successResponse } = require("../utils/response");
const pesananService = require("../services/pesanan");
const adminRole = require("../constant/auth");

exports.getPesanan = async (req, res, next) => {
  const { status, created_at } = req.query;
  const currentUserId = req.user.id;

  try {
    const data = await pesananService.getPesanan(
      status,
      created_at,
      currentUserId // Selalu filter berdasarkan user yang login
    );

    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.getPesananById = async (req, res, next) => {
  const data = await pesananService.getPesananById(req.params.id);
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

exports.patchPesanan = async (req, res, next) => {
  const { id } = req.params; // ID pesanan dari URL
  const { status } = req.body; // Status baru dari request body
  const user = req.user; // User yang sedang login

  try {
    const updatedPesanan = await pesananService.patchPesanan(id, status, user);
    successResponse(res, {
      message: "Status pesanan berhasil diperbarui!",
      data: updatedPesanan,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPesananAdmin = async (req, res, next) => {
  const { status, created_at, user_id } = req.query;
  const location_id = req.user.location_id;

  try {
    const data = await pesananService.getPesananAdmin(
      status,
      created_at,
      user_id ? Number(user_id) : undefined,
      location_id
    );

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada pesanan pada lokasi anda",
      });
    }

    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.deletePesanan = async (req, res, next) => {
  const data = await pesananService.deletePesanan(req.params.id);

  successResponse(res, {
    message: "Pesanan Deleted successfully!",
    data,
  });
};
