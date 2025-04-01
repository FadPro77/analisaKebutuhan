const express = require("express");

const authRouter = require("./auth");
const menuRouter = require("./menu");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/menu", menuRouter);

module.exports = router;
