const express = require("express");
const {
  validateGetMenu,
  validateGetMenuById,
  validateCreateMenu,
  validateUpdateMenu,
  validateDeleteMenu,
} = require("../middlewares/menu");
const {
  getMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetMenu, getMenu)
  .post(authorization(adminRole), validateCreateMenu, createMenu);

router
  .route("/:id")
  .get(validateGetMenuById, getMenuById)
  .put(validateUpdateMenu, authorization(adminRole), updateMenu)
  .delete(validateDeleteMenu, authorization(adminRole), deleteMenu);

module.exports = router;
