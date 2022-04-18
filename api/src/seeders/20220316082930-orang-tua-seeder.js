const _ = require('lodash');
const { Users, OrangTuas } = require('../models');
const {
  encryption: { hashText },
} = require('../utils');
const { orangTua } = require('../utils/seederConstant');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orangTuaUsers = await Users.bulkCreate(
      await Promise.all(
        _.map(orangTua.USER, async ({ password, ...val }) => ({
          ...val,
          password: await hashText(password),
        }))
      )
    );

    await OrangTuas.bulkCreate(
      _.map(orangTua.ROLE, (ortu, index) => ({
        ...ortu,
        userId: orangTuaUsers[index].id,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
