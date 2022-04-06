const _ = require('lodash');
const { validationResult, body, check } = require('express-validator');
const { USER_ROLE } = require('../constants');

const siswaSchema = [
  body('nis').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.SISWA) throw new Error('NIS dibutuhkan!');

    return true;
  }),
  body('nisn').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.SISWA) throw new Error('NISN dibutuhkan!');

    return true;
  }),
  body('namaLengkap').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.SISWA) {
      throw new Error('Nama lengkap dibutuhkan!');
    }

    return true;
  }),
  body('orangTuaId').custom((value, { req }) => {
    if (_.isNil(value) && req.body.role === USER_ROLE.SISWA) {
      throw new Error('Nama orang tua dibutuhkan!');
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

module.exports = siswaSchema;
