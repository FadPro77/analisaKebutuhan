const locationRepository = require("../repositories/location");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getLocation = async (address) => {
  const location = await locationRepository.getLocation(address);
  if (!location.length) {
    throw new NotFoundError("No location found with the provided criteria.");
  }
  return location;
};

exports.getLocationById = async (id) => {
  const location = await locationRepository.getLocationById(id);

  if (!location) {
    throw new NotFoundError("Location is Not Found!");
  }

  return location;
};
