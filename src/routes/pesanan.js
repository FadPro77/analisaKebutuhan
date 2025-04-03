const express = require("express");
const {
  validateGetPesanan,
  validateGetPesananById,
  validateCreatePesanan,
  validatePatchPesanan,
  validateDeletePesanan,
} = require("../middlewares/pesanan");
const {
  getPesanan,
  getPesananById,
  createPesanan,
  patchPesanan,
  getPesananAdmin,
  deletePesanan,
} = require("../controllers/pesanan");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    validateGetPesanan,

    getPesanan
  )
  .post(
    authorization(adminRole, userRole),
    validateCreatePesanan,
    createPesanan
  );

router
  .route("/admin")
  .get(authorization(adminRole), validateGetPesanan, getPesananAdmin);

router
  .route("/:id")
  .get(validateGetPesananById, getPesananById)
  .patch(authorization(adminRole), validatePatchPesanan, patchPesanan)
  .delete(
    authorization(userRole, adminRole),
    validateDeletePesanan,
    deletePesanan
  );

module.exports = router;
