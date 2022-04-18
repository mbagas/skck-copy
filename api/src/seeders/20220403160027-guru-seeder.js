const _ = require('lodash');
const { Gurus, Users } = require('../models');
const {
  encryption: { hashText },
} = require('../utils');
const { guru } = require('../utils/seederConstant');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const guruUser = await Users.bulkCreate(
      await Promise.all(
        _.map(guru.USER, async ({ password, ...val }) => ({
          ...val,
          password: await hashText(password),
        }))
      )
    );

    await Gurus.bulkCreate(
      _.map(guru.ROLE, (ortu, index) => ({
        ...ortu,
        userId: guruUser[index].id,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
