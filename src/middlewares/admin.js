const { verifyToken } = require("./auth"); // pakai auth middleware yang sudah ada

const verifyAdmin = (req, res, next) => {
  if (req.user?.role_id !== 1) {
    // assuming role_id 1 = admin
    return res.status(403).json({
      success: false,
      message: "Hanya admin yang dapat mengakses resource ini",
    });
  }
  next();
};

module.exports = {
  verifyAdmin,
};
