-- AlterTable
ALTER TABLE "saldo" ADD COLUMN     "pengeluaran_id" INTEGER;

-- CreateTable
CREATE TABLE "pengeluaran" (
    "id" SERIAL NOT NULL,
    "keterangan" VARCHAR NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pengeluaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saldo" ADD CONSTRAINT "saldo_pengeluaran_id_fkey" FOREIGN KEY ("pengeluaran_id") REFERENCES "pengeluaran"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
