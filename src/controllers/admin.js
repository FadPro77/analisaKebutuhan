const adminService = require("../services/admin");

const getCountData = async (req, res, next) => {
  try {
    const data = await adminService.getCountAllData();
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil jumlah semua data",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCountData,
};
