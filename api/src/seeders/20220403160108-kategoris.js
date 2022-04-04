const { KategoriPelanggarans } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await KategoriPelanggarans.bulkCreate([
      {
        namaKategori: 'Melawan Guru',
        poin: 10,
      },
      {
        namaKategori: 'Berkelahi',
        poin: 5,
      },
      {
        namaKategori: 'Terlambat',
        poin: 2,
      },
      {
        namaKategori: 'Makan Dikelas',
        poin: 1,
      },
      {
        namaKategori: 'Atribut Tidak Lengkap',
        poin: 2,
      },
      {
        namaKategori: 'Tidak Ibadah',
        poin: 3,
      },
      {
        namaKategori: 'Tidak Mengerjakan Tugas',
        poin: 1,
      },
      {
        namaKategori: 'Merokok',
        poin: 4,
      },
      {
        namaKategori: 'Berpacaran',
        poin: 6,
      },
      {
        namaKategori: 'LGBT',
        poin: 10,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('KategoriPelanggarans', null, {}),
};
