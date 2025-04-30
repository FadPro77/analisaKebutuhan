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

router
  .route("/")
  .get(validateGetMenu, getMenu)
  .post(authorization(adminRole), validateCreateMenu, createMenu);

router
  .route("/:id")
  .get(validateGetMenuById, getMenuById)
  .put(authorization(adminRole), validateUpdateMenu, updateMenu)
  .delete(authorization(adminRole), validateDeleteMenu, deleteMenu);

module.exports = router;
