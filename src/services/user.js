const userRepository = require("../repositories/users");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getUser = async (first_name, last_name, email, phone, location_id) => {
  const user = await userRepository.getUser(
    first_name,
    last_name,
    email,
    phone,
    location_id
  );
  if (!user.length) {
    throw new NotFoundError("No user found with the provided criteria.");
  }
  return user;
};
