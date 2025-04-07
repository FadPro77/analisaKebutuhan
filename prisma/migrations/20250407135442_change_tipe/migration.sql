/*
  Warnings:

  - Changed the type of `tipe` on the `saldo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "tipeSaldo" AS ENUM ('pemasukan', 'pengeluaran');

-- AlterTable
ALTER TABLE "saldo" DROP COLUMN "tipe",
ADD COLUMN     "tipe" "tipeSaldo" NOT NULL;
