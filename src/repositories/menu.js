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
      harga: { contains: harga, mode: "insensitive" },
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

exports.updateSpec = async (id, data) => {
  const updatedSpec = await prisma.specs.update({
    where: {
      id: Number(id),
    },
    data: {
      spec_name: data.spec_name,
    },
  });

  const serializedSpecs = JSONBigInt.stringify(updatedSpec);
  return JSONBigInt.parse(serializedSpecs);
};

exports.deleteSpecById = async (id) => {
  const deletedSpec = await prisma.specs.delete({
    where: { id: Number(id) },
  });
  return deletedSpec;
};
