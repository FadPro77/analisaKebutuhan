const express = require("express");
const {
  validateRegister,
  validateLogin,
  authorization,
  validateAdmin,
  validateGoogleLogin,
} = require("../middlewares/auth");
const {
  register,
  login,
  getProfile,
  googleLogin,
  changeUserRole,
} = require("../controllers/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authorization(adminRole, userRole), getProfile);
router.post("/google/login", validateGoogleLogin, googleLogin);
router.put(
  "/change-role",
  authorization(adminRole),
  validateAdmin,
  changeUserRole
);

module.exports = router;
