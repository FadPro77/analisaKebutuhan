const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getLocation = async (address) => {
  let query = {
    where: {},
  };

  let orQuery = [];
  if (address) {
    orQuery.push({
      address: { contains: address, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedLocation = await prisma.location.findMany(query);

  const serializedLocation = JSONBigInt.stringify(searchedLocation);
  return JSONBigInt.parse(serializedLocation);
};

exports.getLocationById = async (id) => {
  const location = await prisma.location.findUnique({
    where: { id: Number(id) },
  });

  const serializedLocation = JSONBigInt.stringify(location);
  return JSONBigInt.parse(serializedLocation);
};
