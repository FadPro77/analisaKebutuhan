/*
  Warnings:

  - You are about to drop the column `pesanan_id` on the `saldo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "saldo" DROP CONSTRAINT "saldo_pesanan_id_fkey";

-- AlterTable
ALTER TABLE "saldo" DROP COLUMN "pesanan_id",
ADD COLUMN     "payment_id" INTEGER;

-- AddForeignKey
ALTER TABLE "saldo" ADD CONSTRAINT "saldo_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
