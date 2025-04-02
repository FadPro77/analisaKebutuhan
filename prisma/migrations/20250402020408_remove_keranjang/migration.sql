/*
  Warnings:

  - You are about to drop the `keranjang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "keranjang" DROP CONSTRAINT "keranjang_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "keranjang" DROP CONSTRAINT "keranjang_pesanan_id_fkey";

-- DropForeignKey
ALTER TABLE "keranjang" DROP CONSTRAINT "keranjang_user_id_fkey";

-- DropTable
DROP TABLE "keranjang";
