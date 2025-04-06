/*
  Warnings:

  - A unique constraint covering the columns `[midtrans_order_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "midtrans_order_id" VARCHAR,
ADD COLUMN     "snap_token" VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "payment_midtrans_order_id_key" ON "payment"("midtrans_order_id");
