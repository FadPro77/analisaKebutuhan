const { successResponse } = require("../utils/response");
const userService = require("../services/user");

exports.getUser = async (req, res, next) => {
  const data = await userService.getUser(
    req.query?.first_name,
    req.query?.last_name,
    req.query?.phone,
    req.query?.email
  );

  successResponse(res, data);
};
