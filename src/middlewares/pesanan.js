const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

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
    // Validasi request body
    const validatedData = validateBody.parse(req.body);

    // Pastikan req.user ada sebelum mengakses ID
    if (!req.user || !req.user.id) {
      throw new BadRequestError("User harus login untuk membuat pesanan.");
    }

    // Konversi request agar sesuai dengan skema database
    req.body = {
      user_id: req.user.id, // Otomatis diambil dari req.user
      status: "pending",
      pesanan_items: [
        {
          menu_id: validatedData.menu_id,
          jumlah: validatedData.jumlah,
          subtotal: 0, // Tambahkan subtotal default agar tidak undefined
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
