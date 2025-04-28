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
    ketersediaan: z
      .union([z.string(), z.boolean()])
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      })
      .optional(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  try {
    const validatedData = validateBody.parse(req.body);
    if (validatedData.ketersediaan === undefined) {
      validatedData.ketersediaan = true;
    }
    const resultvalidateFileBody = validateFileBody.safeParse(req.files);
    if (!resultvalidateFileBody.success) {
      throw new BadRequestError(resultvalidateFileBody.error.errors);
    }

    req.body = validatedData;
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next();
};

exports.validateUpdateMenu = (req, res, next) => {
  const validateBody = z.object({
    nama: z.string().min(1, "Nama menu tidak boleh kosong").optional(),
    harga: z.coerce
      .number()
      .positive()
      .min(1, "Harga tidak boleh kosong")
      .optional(),
    kategori: z.string().min(1, "Nama kategori tidak boleh kosong").optional(),
    ketersediaan: z
      .union([z.string(), z.boolean()])
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      })
      .optional(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  try {
    const validatedData = validateBody.parse(req.body);

    if (validatedData.ketersediaan === undefined) {
      validatedData.ketersediaan = true;
    }

    const resultvalidateFileBody = validateFileBody.safeParse(req.files);
    if (!resultvalidateFileBody.success) {
      throw new BadRequestError(resultvalidateFileBody.error.errors);
    }

    req.body = validatedData;
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next();
};

exports.validateDeleteMenu = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
