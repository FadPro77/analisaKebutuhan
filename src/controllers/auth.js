const authService = require("../services/auth");
const { successResponse } = require("../utils/response");
const userRepository = require("../repositories/users");

exports.register = async (req, res, next) => {
  const data = await authService.register(req.body, req.files);
  successResponse(res, data);
};

exports.login = async (req, res, next) => {
  const data = await authService.login(req.body.email, req.body.password);
  successResponse(res, data);
};

exports.getProfile = async (req, res, next) => {
  const data = req.user;

  delete data.password;

  successResponse(res, data);
};

exports.changeUserRole = async (req, res) => {
  const { userId, newRoleId } = req.body;

  const updatedUser = await userRepository.updateUserRole(userId, newRoleId);

  res.status(200).json({
    success: true,
    data: updatedUser,
    message: "User role updated successfully!",
  });
};

exports.googleLogin = async (req, res, next) => {
  const data = await authService.googleLogin(req.body.access_token);
  successResponse(res, data);
};
