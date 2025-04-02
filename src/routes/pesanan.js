const express = require("express");
const {
  validateGetPesanan,
  validateGetPesananById,
  validateCreatePesanan,
} = require("../middlewares/pesanan");
const {
  getPesanan,
  getPesananById,
  createPesanan,
} = require("../controllers/pesanan");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetPesanan, getPesanan)
  .post(validateCreatePesanan, createPesanan);

router.route("/:id").get(validateGetPesananById, getPesananById);

module.exports = router;
