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

exports.updateMenu = async (req, res, next) => {
  const { id } = req.params;

  const data = await menuService.updateMenu(id, req.body, req.files);
  successResponse(res, {
    message: "Menu Updated successfully!",
    data,
  });
};

exports.deleteMenu = async (req, res, next) => {
  const data = await menuService.deleteMenu(req.params.id);

  successResponse(res, {
    message: "Menu Deleted successfully!",
    data,
  });
};
