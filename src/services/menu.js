const menuRepository = require("../repositories/menu");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getMenu = async (nama, harga, kategori, ketersediaan) => {
  const menu = await menuRepository.getMenu(
    nama,
    harga,
    kategori,
    ketersediaan
  );
  if (!menu.length) {
    throw new NotFoundError("No menu found with the provided criteria.");
  }
  return menu;
};

exports.getMenuById = async (id) => {
  const menu = await menuRepository.getMenuById(id);

  if (!menu) {
    throw new NotFoundError("Menu is Not Found!");
  }

  return menu;
};

exports.createMenu = async (data, file) => {
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }
  return menuRepository.createMenu(data);
};

exports.updateMenu = async (id, data, file) => {
  const existingMenu = await menuRepository.getMenuById(id);
  if (!existingMenu) {
    throw new NotFoundError("Menu is Not Found!");
  }

  data = {
    ...existingMenu,
    ...data,
  };
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  const updatedMenu = await menuRepository.updateMenu(id, data);
  if (!updatedMenu) {
    throw new InternalServerError(["Failed to update menu!"]);
  }

  return updatedMenu;
};

exports.deleteMenu = async (id) => {
  const existingMenu = await menuRepository.getMenuById(id);
  if (!existingMenu) {
    throw new NotFoundError("Menu is Not Found!");
  }

  const deletedMenu = await menuRepository.deleteMenu(id);
  if (!deletedMenu) {
    throw new InternalServerError(["Failed to delete menu!"]);
  }

  return existingMenu;
};
