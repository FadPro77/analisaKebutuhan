const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetPayment = (req, res, next) => {
  const validateQuery = z.object({
    metode: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetPaymentById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreatePaymentManual = (req, res, next) => {
  const validateBody = z.object({
    metode: z.string().min(1, "Metode pembayaran tidak boleh kosong"),
    pesanan_id: z.coerce
      .number()
      .positive()
      .min(1, "Pesanan tidak boleh kosong"),
    status: z.string().min(1, "status pembayaran tidak boleh kosong"),
    transaksi_id: z.string().min(1, "Pesanan tidak boleh kosong"),
    jumlah: z.coerce.number().positive().min(1, "Pesanan tidak boleh kosong"),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  req.body = resultValidateBody.data;
  next();
};

exports.validateCreatePaymentMidtrans = (req, res, next) => {
  const validateBody = z.object({
    pesanan_id: z.coerce
      .number()
      .positive("Pesanan ID harus berupa angka positif")
      .min(1, "Pesanan ID tidak boleh kosong"),
    jumlah: z.coerce
      .number()
      .positive("Jumlah harus berupa angka positif")
      .min(1, "Jumlah pembayaran tidak boleh kosong"),
    user: z.object({
      first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
      last_name: z.string().optional(),
      email: z.string().email("Email tidak valid"),
      phone: z
        .string()
        .min(8, "Nomor telepon tidak boleh kosong")
        .regex(/^[0-9+]+$/, "Nomor telepon tidak valid"),
    }),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  req.body = resultValidateBody.data;
  next();
};
