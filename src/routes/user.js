const express = require("express");
const { validateGetUser } = require("../middlewares/user");
const { getUser } = require("../controllers/user");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router.route("/").get(authorization(adminRole), validateGetUser, getUser);

module.exports = router;
