const _ = require('lodash');
const { Siswas, Users, OrangTuas } = require('../models');
const {
  encryption: { hashText },
} = require('../utils');
const { siswa } = require('../utils/seederConstant');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const siswaUsers = await Users.bulkCreate(
      await Promise.all(
        _.map(siswa.USER, async ({ password, ...val }) => ({
          ...val,
          password: await hashText(password),
        }))
      )
    );

    await Siswas.bulkCreate(
      await Promise.all(
        _.map(siswa.ROLE, async ({ noTelp, ...val }, index) => {
          const orangTua = await OrangTuas.findOne({
            where: {
              noTelp,
            },
          });

          return {
            ...val,
            userId: siswaUsers[index].id,
            orangTuaId: orangTua.id,
          };
        })
      )
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
