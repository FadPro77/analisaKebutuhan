const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.imageUpload = async (file) => {
  const uploadedFile = await imagekit.upload({
    file: file.data,
    fileName: file.name,
  });
  return uploadedFile?.url;
};

// exports.imageDelete = async (fileid) => {
//   try {
//     const deletedFile = await imagekit.deleteFile(fileid);
//     return deletedFile?.url;
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     throw new Error("Failed to delete file from ImageKit");
//   }
// };
