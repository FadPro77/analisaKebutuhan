const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/image-kit");
const { Unauthorized } = require("../utils/request");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.register = async (data) => {
  // create user
  const user = await userRepository.createUser(data);

  // generate token
  const token = createToken(user);

  // don't forget to remove the password object, if not removed it will be displayed in response
  delete user.password;

  // return the user info and the token
  return {
    user,
    token,
  };
};

exports.login = async (email, password) => {
  // get user by email
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Email is not found!");
  }

  // compare the password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Unauthorized("Incorrect password!");
  }

  const token = createToken(user);
  delete user.password;

  return {
    user,
    token,
  };
};

const createToken = (user) => {
  // generate token with jwt
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "14h",
  });

  return token;
};

exports.googleLogin = async (accessToken) => {
  // get information of access token by google api
  const { email, name, picture } = await userRepository.googleLogin(
    accessToken
  );

  // Split the full name into first_name and last_name
  const [first_name, ...rest] = name.trim().split(" ");
  const last_name = rest.join(" ") || "-";

  // check if user already has an account
  let user = await userRepository.getUserByEmail(email);
  if (!user) {
    // register the user
    user = await userRepository.createUser({
      first_name,
      last_name,
      phone: "", // kosong karena google tidak kasih nomor telepon
      email,
      password: "", // karena Google login, tidak perlu password
    });
  }

  // create the token
  const token = createToken(user);

  // remove password before sending user data
  delete user.password;

  return { user, token };
};

exports.getProfile = async (userId) => {
  return prisma.users.findUnique({
    where: { id: userId },
    include: {
      location: true, // Menyertakan data lokasi
    },
  });
};
