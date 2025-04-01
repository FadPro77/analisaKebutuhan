const express = require("express");
const {
  validateGetMenu,
  validateGetMenuById,
  validateCreateMenu,
} = require("../middlewares/menu");
const { getMenu, getMenuById, createMenu } = require("../controllers/menu");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetMenu, getMenu)
  .post(validateCreateMenu, createMenu);

router.route("/:id").get(validateGetMenuById, getMenuById);

module.exports = router;
