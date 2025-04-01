const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetMenu = (req, res, next) => {
  const validateQuery = z.object({
    nama: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetMenuById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateMenu = (req, res, next) => {
  const validateBody = z.object({
    nama: z.string().min(1, "Nama menu tidak boleh kosong"),
    harga: z.coerce.number().positive().min(1, "Harga tidak boleh kosong"),
    kategori: z.string().min(1, "Nama kategori tidak boleh kosong"),
    ketersediaan: z.boolean().optional(),
  });

  try {
    const validatedData = validateBody.parse(req.body);

    if (validatedData.ketersediaan === undefined) {
      validatedData.ketersediaan = true;
    }

    req.body = validatedData;
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next();
};

exports.validateUpdateSpec = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    spec_name: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateDeleteSpecById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
