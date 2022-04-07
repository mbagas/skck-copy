const _ = require('lodash');
const { body } = require('express-validator');
const { USER_ROLE } = require('../constants');

const guruSchema = [
  body('nipNrk').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.GURU) throw new Error('NIP/NRK dibutuhkan!');

    return true;
  }),
  body('namaLengkap').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.GURU) {
      throw new Error('Nama lengkap dibutuhkan!');
    }

    return true;
  }),
  body('alamat')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      if (!_.isString(value)) throw new Error('Format alamat tidak sesuai!');

      return true;
    }),
];

module.exports = guruSchema;
