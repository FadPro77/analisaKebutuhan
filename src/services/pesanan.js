const pesananRepository = require("../repositories/pesanan");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getPesanan = async (
  status,
  created_at,
  first_name,
  last_name,
  phone,
  nama,
  kategori,
  image,
  jumlah,
  subtotal
) => {
  const pesanan = await pesananRepository.getPesanan(
    status,
    created_at,
    first_name,
    last_name,
    phone,
    nama,
    kategori,
    image,
    jumlah,
    subtotal
  );
  if (!pesanan.length) {
    throw new NotFoundError("No pesanan found with the provided criteria.");
  }
  return pesanan;
};

exports.getPesananById = async (id) => {
  const pesanan = await pesananRepository.getPesananById(id);

  if (!pesanan) {
    throw new NotFoundError("Pesanan is Not Found!");
  }

  return pesanan;
};

exports.createPesanan = async (data) => {
  const { user_id, pesanan_items } = data;

  if (
    !pesanan_items ||
    !Array.isArray(pesanan_items) ||
    pesanan_items.length === 0
  ) {
    throw new Error("Pesanan harus memiliki minimal satu item.");
  }

  return pesananRepository.createPesanan(user_id, pesanan_items);
};
