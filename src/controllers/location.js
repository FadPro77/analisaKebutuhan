const { successResponse } = require("../utils/response");
const locationService = require("../services/location");

exports.getLocation = async (req, res, next) => {
  const data = await locationService.getLocation(req.query?.address);

  successResponse(res, data);
};

exports.getLocationById = async (req, res, next) => {
  const data = await locationService.getLocationById(req.params.id);
  successResponse(res, data);
};
