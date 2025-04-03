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
  subtotal,
  user_id
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
    subtotal,
    user_id
  );
  if (!pesanan.length) {
    throw new NotFoundError("Tidak ada pesanan yang ditemukan.");
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

exports.updatePesananStatus = async (id, status) => {
  return prisma.pesanan.update({
    where: { id },
    data: { status },
  });
};

exports.patchPesanan = async (id, status, user) => {
  // Ambil pesanan berdasarkan ID
  const pesanan = await pesananRepository.getPesananById(id);

  if (!pesanan) {
    throw new NotFoundError("Pesanan tidak ditemukan.");
  }

  // Cek apakah user adalah admin atau pemilik pesanan
  if (user.role_id !== 1 && pesanan.user_id !== user.id) {
    throw new Forbidden(
      "Anda tidak memiliki izin untuk mengubah status pesanan ini."
    );
  }

  // Update status pesanan
  const updatedPesanan = await pesananRepository.patchPesanan(id, status);

  return updatedPesanan;
};

exports.getPesananAdmin = async (status, created_at, user_id) => {
  return await pesananRepository.getPesananAdmin(status, created_at, user_id);
};

exports.deletePesanan = async (id) => {
  const existingPesanan = await pesananRepository.getPesananById(id);
  if (!existingPesanan) {
    throw new NotFoundError("Pesanan is Not Found!");
  }

  const deletedPesanan = await pesananRepository.deletePesanan(id);
  if (!deletedPesanan) {
    throw new InternalServerError(["Failed to delete spec!"]);
  }

  return existingPesanan;
};
