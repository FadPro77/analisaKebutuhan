const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetSaldo = (req, res, next) => {
  const validateQuery = z.object({
    tipe: z.string().optional().nullable(),
    keterangan: z.string().optional().nullable(),
    jumlah: z.coerce.number().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetSaldoById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateSaldo = (req, res, next) => {
  const validateBody = z.object({
    tipe: z.string().min(1, "Tipe tidak boleh kosong"),
    jumlah: z.coerce.number().positive().min(1, "Jumlah tidak boleh kosong"),
    keterangan: z.string().optional().nullable(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  req.body = result.data;

  next();
};

exports.validateUpdateSaldo = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    tipe: z.string().min(1, "Tipe tidak boleh kosong"),
    jumlah: z.coerce.number().positive().min(1, "Jumlah tidak boleh kosong"),
    keterangan: z.string().optional().nullable(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  req.body = resultValidateBody.data;

  next();
};

exports.validateDeleteSaldo = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
