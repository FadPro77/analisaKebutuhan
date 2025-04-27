const adminRepository = require("../repositories/admin");

const getCountAllData = async () => {
  const data = await adminRepository.countAllData();
  return data;
};

module.exports = {
  getCountAllData,
};
