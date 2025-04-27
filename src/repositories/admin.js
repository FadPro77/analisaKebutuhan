const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const countAllData = async () => {
  const menuCount = await prisma.menu.count();
  const paymentCount = await prisma.payment.count();
  const pengeluaranCount = await prisma.pengeluaran.count();
  const pesananCount = await prisma.pesanan.count();
  const pesananItemsCount = await prisma.pesanan_items.count();
  const saldoCount = await prisma.saldo.count();
  const usersCount = await prisma.users.count();

  return {
    menu: menuCount,
    payment: paymentCount,
    pengeluaran: pengeluaranCount,
    pesanan: pesananCount,
    pesanan_items: pesananItemsCount,
    saldo: saldoCount,
    users: usersCount,
  };
};

module.exports = {
  countAllData,
};
