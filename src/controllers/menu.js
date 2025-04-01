const { successResponse } = require("../utils/response");
const menuService = require("../services/menu");

exports.getMenu = async (req, res, next) => {
  const data = await menuService.getMenu(
    req.query?.nama,
    req.query?.harga,
    req.query?.kategori
  );

  successResponse(res, data);
};

exports.getMenuById = async (req, res, next) => {
  const data = await menuService.getMenuById(req.params.id);
  successResponse(res, data);
};

exports.createMenu = async (req, res, next) => {
  const data = await menuService.createMenu(req.body, req.files);
  successResponse(res, {
    message: "Menu Created successfully!",
    data,
  });
};

exports.updateManufacture = async (req, res, next) => {
  const id = req.params.id;

  const data = await manufactureService.updateManufacture(id, req.body);
  successResponse(res, {
    message: "Manufacture Updated successfully!",
    data,
  });
};

exports.deleteManufactureById = async (req, res, next) => {
  const data = await manufactureService.deleteManufactureById(req.params.id);

  successResponse(res, {
    message: "Manufacture Deleted successfully!",
    data,
  });
};
