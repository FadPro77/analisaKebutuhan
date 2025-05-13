-- AlterTable
ALTER TABLE "pesanan" ADD COLUMN     "location_id" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "location_id" INTEGER;

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
