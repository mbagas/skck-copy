const _ = require('lodash');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Pelanggarans',
      _.map(Array(100), () => {
        const time = moment().subtract(Math.floor(Math.random() * 28), 'days');
        const byMonth = time.add(Math.floor(Math.random() * 6), 'months');

        const useableTime = byMonth.toDate();

        const pelanggaranId = _.random(1, 10);
        const siswaId = _.random(1, 6);

        return {
          pelanggaranId,
          siswaId,
          createdAt: useableTime,
          updatedAt: useableTime,
        };
      })
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Pelanggarans', null, {}),
};
