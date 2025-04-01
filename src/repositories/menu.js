const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getMenu = async (nama, harga, kategori, ketersediaan) => {
  let query = {
    where: {},
  };

  let orQuery = [];
  if (nama) {
    orQuery.push({
      nama: { contains: nama, mode: "insensitive" },
    });
  }

  if (harga) {
    orQuery.push({
      harga: Number(harga),
    });
  }

  if (kategori) {
    orQuery.push({
      kategori: { contains: kategori, mode: "insensitive" },
    });
  }

  if (ketersediaan) {
    orQuery.push({
      ketersediaan: { contains: ketersediaan, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedMenu = await prisma.menu.findMany(query);

  const serializedMenu = JSONBigInt.stringify(searchedMenu);
  return JSONBigInt.parse(serializedMenu);
};

exports.getMenuById = async (id) => {
  const menu = await prisma.menu.findUnique({
    where: { id: Number(id) },
  });

  const serializedMenu = JSONBigInt.stringify(menu);
  return JSONBigInt.parse(serializedMenu);
};

exports.createMenu = async (data) => {
  const newMenu = await prisma.menu.create({
    data,
  });

  const serializedMenus = JSONBigInt.stringify(newMenu);
  return JSONBigInt.parse(serializedMenus);
};

exports.updateMenu = async (id, data) => {
  const updatedMenu = await prisma.menu.update({
    where: {
      id: Number(id),
    },
    data: {
      nama: data.nama,
      harga: data.harga,
      kategori: data.kategori,
      ketersediaan: data.ketersediaan,
      image: data.image,
    },
  });

  const serializedMenu = JSONBigInt.stringify(updatedMenu);
  return JSONBigInt.parse(serializedMenu);
};

exports.deleteMenu = async (id) => {
  const deletedMenu = await prisma.menu.delete({
    where: { id: Number(id) },
  });
  return deletedMenu;
};
