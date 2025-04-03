const { z } = require("zod");
const { BadRequestError, Forbidden } = require("../utils/request");
const { Prisma } = require("@prisma/client");
const { adminRole } = require("../constant/auth");

exports.validateGetPesanan = (req, res, next) => {
  const validateQuery = z.object({
    // nama: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetPesananById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreatePesanan = (req, res, next) => {
  const validateBody = z.object({
    menu_id: z.coerce
      .number()
      .int()
      .positive("Menu ID harus berupa angka positif"),

    jumlah: z.coerce.number().int().positive("Jumlah harus angka positif"),
  });

  try {
    const validatedData = validateBody.parse(req.body);

    if (!req.user || !req.user.id) {
      throw new BadRequestError("User harus login untuk membuat pesanan.");
    }

    req.body = {
      user_id: req.user.id,
      status: "pending",
      pesanan_items: [
        {
          menu_id: validatedData.menu_id,
          jumlah: validatedData.jumlah,
          subtotal: 0,
        },
      ],
    };
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next();
};

exports.validatePatchPesanan = (req, res, next) => {
  const schema = z.object({
    status: z
      .string()
      .min(1, "Status pesanan harus berupa string dan tidak boleh kosong."),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError("Validation failed!", result.error.errors);
  }

  next();
};

exports.validateDeletePesanan = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
