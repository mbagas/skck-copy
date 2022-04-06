const _ = require('lodash');
const { body } = require('express-validator');
const { USER_ROLE } = require('../constants');

const orangTuaSchema = [
  body('namaLengkap').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.ORANG_TUA) {
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
  body('noTelp').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.ORANG_TUA) {
      throw new Error('Nomor telepon dibutuhkan!');
    }

    return true;
  }),
];

module.exports = orangTuaSchema;
