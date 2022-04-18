const { KategoriPelanggarans } = require('../models');
const { kategoriPelanggaran } = require('../utils/seederConstant');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await KategoriPelanggarans.bulkCreate(kategoriPelanggaran);
  },

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('KategoriPelanggarans', null, {}),
};
