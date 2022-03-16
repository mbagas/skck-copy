const _ = require('lodash');
const { Siswas, Users, OrangTuas } = require('../models');
const {
  constants: { USER_ROLE },
  encryption: { hashText },
} = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orangTuaUsers = await Users.bulkCreate([
      {
        userName: 'orangTua',
        password: await hashText('orangTua'),
        role: USER_ROLE.ORANG_TUA,
      },
    ]);

    const orangTuas = await OrangTuas.bulkCreate(
      _.map(orangTuaUsers, (orangTua) => ({
        namaLengkap: 'orangTua',
        alamat: 'alamat',
        userId: orangTua.id,
      }))
    );

    const users = await Users.bulkCreate([
      {
        userName: 'siswa',
        password: await hashText('siswa'),
        role: USER_ROLE.SISWA,
      },
    ]);

    await Siswas.bulkCreate(
      _.map(users, (user, index) => ({
        namaLengkap: 'namaLengkap',
        alamat: 'alamat',
        userId: user.id,
        orangTuaId: orangTuas[index].id,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
