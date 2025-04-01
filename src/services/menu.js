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

exports.createMenu = async (data) => {
  return menuRepository.createMenu(data);
};

exports.updateSpec = async (id, data, file) => {
  const existingSpec = specRepository.getSpecById(id);
  if (!existingSpec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  data = {
    ...existingSpec,
    ...data,
  };

  const updatedSpec = specRepository.updateSpec(id, data);
  if (!updatedSpec) {
    throw new InternalServerError(["Failed to update spec!"]);
  }

  return updatedSpec;
};

exports.deleteSpecById = async (id) => {
  const existingSpec = await specRepository.getSpecById(id);
  if (!existingSpec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  const deletedSpec = await specRepository.deleteSpecById(id);
  if (!deletedSpec) {
    throw new InternalServerError(["Failed to delete spec!"]);
  }

  return existingSpec;
};
