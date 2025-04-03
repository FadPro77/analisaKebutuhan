const express = require("express");

const authRouter = require("./auth");
const menuRouter = require("./menu");
const pesananRouter = require("./pesanan");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/menu", menuRouter);
router.use("/pesanan", pesananRouter);

module.exports = router;
