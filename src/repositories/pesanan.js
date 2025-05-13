const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getPesanan = async (status, created_at, user_id, location_id) => {
  let query = {
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
          phone: true,
          email: true,
        },
      },
      location: {
        select: {
          address: true,
        },
      },
      pesanan_items: {
        select: {
          jumlah: true,
          subtotal: true,
          menu: {
            select: {
              nama: true,
              kategori: true,
              image: true,
            },
          },
        },
      },
    },
  };

  if (user_id) {
    query.where = { user_id };
  }

  if (status) {
    query.where.status = { contains: status, mode: "insensitive" };
  }

  if (created_at) {
    const dateFilter = new Date(created_at);
    if (!isNaN(dateFilter.getTime())) {
      query.where.created_at = { gte: dateFilter };
    }
  }

  if (location_id) {
    query.where = { location_id };
  }

  const searchedPesanan = await prisma.pesanan.findMany(query);

  return JSONBigInt.parse(JSONBigInt.stringify(searchedPesanan));
};

exports.getPesananById = async (id) => {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: Number(id) },
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
          phone: true,
        },
      },
      location: {
        select: {
          address: true,
        },
      },
      pesanan_items: {
        select: {
          jumlah: true,
          subtotal: true,
          menu: {
            select: {
              nama: true,
              kategori: true,
              image: true,
            },
          },
        },
      },
    },
  });

  const serializedPesanan = JSONBigInt.stringify(pesanan);
  return JSONBigInt.parse(serializedPesanan);
};

exports.createPesanan = async (userId, locationId, items) => {
  const pesananItemsData = await Promise.all(
    items.map(async (item) => {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menu_id },
        select: { harga: true },
      });

      if (!menu) {
        throw new Error(`Menu dengan id ${item.menu_id} tidak ditemukan`);
      }

      return {
        menu_id: item.menu_id,
        jumlah: item.jumlah,
        subtotal: item.jumlah * menu.harga,
      };
    })
  );

  // Validasi location_id
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: { id: true },
  });

  if (!location) {
    throw new Error(`Lokasi dengan id ${locationId} tidak ditemukan`);
  }

  const newPesanan = await prisma.pesanan.create({
    data: {
      user_id: userId,
      status: "pending",
      location_id: locationId,
      pesanan_items: { create: pesananItemsData },
    },
    include: { pesanan_items: true },
  });

  return newPesanan;
};

exports.patchPesanan = async (pesananId, status) => {
  const existingPesanan = await prisma.pesanan.findUnique({
    where: { id: Number(pesananId) },
  });

  if (!existingPesanan) {
    throw new error(`pesanan ${pesananId} tidak ditemukan`);
  }

  const patchedPesanan = await prisma.pesanan.update({
    where: { id: Number(pesananId) },
    data: { status },
  });

  return patchedPesanan;
};

exports.getPesananAdmin = async (status, created_at, user_id, location_id) => {
  const whereClause = {
    location_id,
  };

  if (user_id) whereClause.user_id = user_id;
  if (status) whereClause.status = { contains: status, mode: "insensitive" };
  if (created_at) {
    const date = new Date(created_at);
    if (!isNaN(date)) whereClause.created_at = { gte: date };
  }

  return await prisma.pesanan.findMany({
    where: whereClause,
    include: {
      users: {
        select: { first_name: true, last_name: true, phone: true, email: true },
      },
      location: {
        select: { address: true },
      },
      pesanan_items: {
        select: {
          jumlah: true,
          subtotal: true,
          menu: { select: { nama: true, kategori: true, image: true } },
        },
      },
    },
  });
};

exports.deletePesanan = async (id) => {
  const deletedPesanan = await prisma.pesanan.delete({
    where: { id: Number(id) },
  });
  return deletedPesanan;
};
