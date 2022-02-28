const { Users } = require('../models');
const {
  constants: { USER_ROLE },
  encryption: { hashText },
} = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    Users.bulkCreate([
      {
        userName: 'admin',
        password: await hashText('admin'),
        role: USER_ROLE.ADMIN,
      },
    ]),
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
