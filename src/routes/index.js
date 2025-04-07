const express = require("express");

const authRouter = require("./auth");
const menuRouter = require("./menu");
const pesananRouter = require("./pesanan");
const paymentRouter = require("./payment");
const pengeluaranRouter = require("./pengeluaran");
const saldoRouter = require("./saldo");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/menu", menuRouter);
router.use("/pesanan", pesananRouter);
router.use("/payment", paymentRouter);
router.use("/pengeluaran", pengeluaranRouter);
router.use("/saldo", saldoRouter);

module.exports = router;
