const express = require("express");

const {
  validateGetPayment,
  validateGetPaymentById,
  validateCreatePaymentManual,
  validateCreatePaymentMidtrans,
} = require("../middlewares/payment");
const {
  getPayment,
  getPaymentById,
  createPaymentManual,
  createPaymentMidtrans,
  handleMidtransNotification,
} = require("../controllers/payment");

const { createMidtransNotification } = require("../services/payment");

const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetPayment, getPayment)
  .post(
    authorization(adminRole, userRole),
    validateCreatePaymentManual,
    createPaymentManual
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetPaymentById,
    getPaymentById
  );

router
  .route("/midtrans")
  .post(
    authorization(adminRole, userRole),
    validateCreatePaymentMidtrans,
    createPaymentMidtrans
  );

router
  .route("/midtrans/notification")
  .post(
    authorization(adminRole, userRole),
    handleMidtransNotification,
    createMidtransNotification
  );

module.exports = router;
