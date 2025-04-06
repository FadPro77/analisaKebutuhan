const express = require("express");

const {
  validateGetPengeluaran,
  validateGetPengeluaranById,
  validateCreatePengeluaran,
  validateUpdatePengeluaran,
  validateDeletePengeluaran,
} = require("../middlewares/pengeluaran");
const {
  getPengeluaran,
  getPengeluaranById,
  createPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
} = require("../controllers/pengeluaran");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole), validateGetPengeluaran, getPengeluaran)
  .post(authorization(adminRole), validateCreatePengeluaran, createPengeluaran);

router
  .route("/:id")
  .get(authorization(adminRole), validateGetPengeluaranById, getPengeluaranById)
  .put(authorization(adminRole), validateUpdatePengeluaran, updatePengeluaran)
  .delete(
    authorization(adminRole),
    validateDeletePengeluaran,
    deletePengeluaran
  );

module.exports = router;
