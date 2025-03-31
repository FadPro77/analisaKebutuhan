-- CreateTable
CREATE TABLE "keranjang" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pesanan_id" INTEGER,
    "menu_id" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 1,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keranjang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "kategori" VARCHAR NOT NULL,
    "ketersediaan" BOOLEAN NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "pesanan_id" INTEGER NOT NULL,
    "metode" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "transaksi_id" VARCHAR,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "tanggal" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesanan" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesanan_items" (
    "id" SERIAL NOT NULL,
    "pesanan_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pesanan_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saldo" (
    "id" SERIAL NOT NULL,
    "tipe" VARCHAR NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "pesanan_id" INTEGER,
    "keterangan" TEXT,
    "tanggal" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saldo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_pesanan_id_key" ON "payment"("pesanan_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaksi_id_key" ON "payment"("transaksi_id");

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pesanan_items" ADD CONSTRAINT "pesanan_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pesanan_items" ADD CONSTRAINT "pesanan_items_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "saldo" ADD CONSTRAINT "saldo_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
