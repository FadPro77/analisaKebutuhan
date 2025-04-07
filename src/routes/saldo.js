const express = require("express");
const {
  validateGetSaldo,
  validateGetSaldoById,
  validateDeleteSaldo,
  validateCreateSaldo,
  validateUpdateSaldo,
} = require("../middlewares/saldo");
const {
  getSaldo,
  getSaldoById,
  deleteSaldo,
  createSaldo,
  updateSaldo,
} = require("../controllers/saldo");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole), validateGetSaldo, getSaldo)
  .post(authorization(adminRole), validateCreateSaldo, createSaldo);

router
  .route("/:id")
  .get(authorization(adminRole), validateGetSaldoById, getSaldoById)
  .put(authorization(adminRole), validateUpdateSaldo, updateSaldo)
  .delete(authorization(adminRole), validateDeleteSaldo, deleteSaldo);

module.exports = router;
