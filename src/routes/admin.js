const express = require("express");
const router = express.Router();
const { getCountData } = require("../controllers/admin");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

router.route("/count").get(authorization(adminRole), getCountData);

module.exports = router;
