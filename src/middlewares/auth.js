const { z } = require("zod");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  Unauthorized,
  Forbidden,
} = require("../utils/request");
const userRepository = require("../repositories/users");

exports.authorization =
  (...roles) =>
  async (req, res, next) => {
    // get token from request headers
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new Unauthorized("You need to login in advance!");
    }

    const splittedAuthHeader = authorizationHeader.split(" ");
    if (splittedAuthHeader.length <= 1) {
      throw new Unauthorized("Token is not valid!");
    }

    const token = splittedAuthHeader[1];

    // extract the token
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    // get information of the user that has that token
    const user = await userRepository.getUserById(extractedToken.user_id);

    // validate the role that can be access to the next middleware
    const accessValidation = roles.includes(user.role_id);
    if (!accessValidation) {
      throw new Forbidden("You can not access this resource!");
    }

    // pass the user to request, then every middleware can access the user profile without needing to get again in repository level
    req.user = user;

    next();
  };

exports.validateRegister = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateUpdateUser = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateAdmin = (req, res, next) => {
  const userRole = req.user.role_id; // Pastikan role_id sudah di-set pada req.user setelah proses otentikasi
  if (userRole !== 1) {
    // adminRole = 1
    throw new Forbidden("You do not have permission to perform this action!");
  }
  next();
};

exports.validateGoogleLogin = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    access_token: z.string(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};
