const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getPesanan = async (status, user_id, created_at) => {
  let query = {
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
          phone: true,
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

  let orQuery = [];
  if (status) {
    orQuery.push({
      status: { contains: status, mode: "insensitive" },
    });
  }

  if (created_at) {
    orQuery.push({
      created_at: { contains: created_at, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  if (user_id) {
    query.where = { ...query.where, user_id: parseInt(user_id) };
  }

  const searchedPesanan = await prisma.pesanan.findMany(query);

  const serializedPesanan = JSONBigInt.stringify(searchedPesanan);
  return JSONBigInt.parse(serializedPesanan);
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
      pesanan_items: {
        select: {
          menu: {
            select: {
              nama: true,
              kategori: true,
              image: true,
            },
          },
        },
        jumlah: true,
        subtotal: true,
      },
    },
  });

  const serializedPesanan = JSONBigInt.stringify(pesanan);
  return JSONBigInt.parse(serializedPesanan);
};

exports.createPesanan = async (userId, items) => {
  const pesananItemsData = await Promise.all(
    items.map(async (item) => {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menu_id },
        select: { harga: true }, // Ambil harga dari database
      });

      if (!menu) {
        throw new Error(`Menu dengan id ${item.menu_id} tidak ditemukan`);
      }

      return {
        menu_id: item.menu_id,
        jumlah: item.jumlah,
        subtotal: item.jumlah * menu.harga, // Hitung subtotal dengan harga dari DB
      };
    })
  );

  const newPesanan = await prisma.pesanan.create({
    data: {
      user_id: userId,
      status: "pending",
      pesanan_items: { create: pesananItemsData },
    },
    include: { pesanan_items: true },
  });

  return newPesanan;
};
