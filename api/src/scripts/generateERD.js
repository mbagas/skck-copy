/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { writeFileSync } = require('fs');
const sequelizeErd = require('sequelize-erd');
const { sequelize } = require('../models');

(async () => {
  const svg = await sequelizeErd({
    source: sequelize,
    format: 'svg',
  });
  writeFileSync(path.resolve(__dirname, './../../../erd.svg'), svg);
})();
