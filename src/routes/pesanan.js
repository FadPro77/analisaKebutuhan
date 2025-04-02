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
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetPesanan, getPesanan)
  .post(
    authorization(adminRole, userRole),
    validateCreatePesanan,
    createPesanan
  );

router.route("/:id").get(validateGetPesananById, getPesananById);

module.exports = router;
