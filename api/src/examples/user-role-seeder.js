// This is a example of creating a user role by using a seeder.
// Creating a seeder from file csv will be added later
const _ = require('lodash');
const { Users, Siswas } = require('../models');
const {
  constants: { USER_ROLE },
  encryption: { hashText },
} = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Users.bulkCreate([
      {
        userName: 'siswa',
        password: await hashText('siswa'),
        role: USER_ROLE.SISWA,
      },
    ]);

    await Siswas.bulkCreate(
      _.map(users, (user) => ({
        namaLengkap: 'namaLengkap',
        alamat: 'alamat',
        userId: user.id,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Siswas', null, {});
  },
};
