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
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  req.body = resultValidateBody.data;
  next();
};
