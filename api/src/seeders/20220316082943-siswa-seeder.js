const _ = require('lodash');
const { Siswas, Users, OrangTuas } = require('../models');
const {
  constants: { USER_ROLE },
  encryption: { hashText },
} = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orangTuaUsers = await Users.bulkCreate(
      await Promise.all(
        _.map(Array(3), async (val, index) => ({
          userName: `orangTua${index + 1}`,
          password: await hashText(`orangTua${index + 1}`),
          role: USER_ROLE.ORANG_TUA,
        }))
      )
    );

    const orangTuas = await OrangTuas.bulkCreate(
      _.map(orangTuaUsers, (orangTua, index) => ({
        namaLengkap: `orangTua${index + 1}`,
        alamat: `alamat${index + 1}`,
        noTelp: _.map(Array(9), (val, id) => `${id + 1}`).join(''),
        userId: orangTua.id,
      }))
    );

    const users = await Users.bulkCreate(
      await Promise.all(
        _.map(Array(9), async (value, index) => ({
          userName: `siswa${index + 1}`,
          password: await hashText(`siswa${index + 1}`),
          role: USER_ROLE.SISWA,
        }))
      )
    );

    let counter = 0;

    await Siswas.bulkCreate(
      _.map(users, (user, index) => {
        const obj = {
          namaLengkap: `namaLengkap${index + 1}`,
          nis: _.map(Array(9), (val, id) => `${id + 1}`).join(''),
          nisn: _.map(Array(9), (val, id) => `${id + 2}`).join(''),
          alamat: 'alamat',
          userId: user.id,
          orangTuaId: orangTuas[counter].id,
        };

        if ((index + 1) % 3 === 0) counter += 1;

        return obj;
      })
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
