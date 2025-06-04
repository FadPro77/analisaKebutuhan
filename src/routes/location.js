const express = require("express");
const {
  validateGetLocation,
  validateGetLocationById,
} = require("../middlewares/location");
const { getLocation, getLocationById } = require("../controllers/location");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router.route("/").get(validateGetLocation, getLocation);
router.route("/:id").get(validateGetLocationById, getLocationById);

module.exports = router;
