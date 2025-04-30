const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const countAllData = async () => {
  const menuCount = await prisma.menu.count();
  const paymentCount = await prisma.payment.count();
  const pesananCount = await prisma.pesanan.count();
  const pesananItemsCount = await prisma.pesanan_items.count();
  const usersCount = await prisma.users.count();

  const pengeluaranSum = await prisma.pengeluaran.aggregate({
    _sum: {
      jumlah: true,
    },
  });

  const saldoData = await prisma.saldo.findMany({
    select: { tipe: true, jumlah: true },
  });

  let totalSaldo = 0;
  let pemasukanCount = 0;

  saldoData.forEach((item) => {
    if (item.tipe === "pemasukan" || item.tipe === "pembayaran") {
      totalSaldo += item.jumlah;
      pemasukanCount += item.jumlah;
    } else if (item.tipe === "pengeluaran") {
      totalSaldo -= item.jumlah;
    }
  });

  return {
    menu: menuCount,
    payment: paymentCount,
    pengeluaran: pengeluaranSum._sum.jumlah || 0,
    pesanan: pesananCount,
    pesanan_items: pesananItemsCount,
    saldo: totalSaldo,
    users: usersCount,
    pemasukanCount,
  };
};

module.exports = {
  countAllData,
};
