const _ = require('lodash');
const { validationResult, body, check } = require('express-validator');
const validator = require('../utils/validator');

exports.userSchema = [
  body('userName').exists({ checkFalsy: true }).isString().withMessage('Username dibutuhkan!'),
  body('password').exists({ checkFalsy: true }).isString().withMessage('Password dibutuhkan!'),
  ...validator,
];

exports.kategoriSchema = [
  body('poin')
    .exists({ checkFalsy: true })
    .withMessage('Poin dibutuhkan!')
    .isInt()
    .withMessage('Poin haruslah berupa angka!'),
  body('namaKategori')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Nama kategori dibutuhkan!'),
];

exports.pelanggaranSchema = [
  check(body('pelanggaransId'))
    .exists({ checkFalsy: true })
    .withMessage('Pelanggaran dibutuhkan!')
    .isArray()
    .withMessage('Pelanggaran dibutuhkan!'),
  body('siswaId').exists({ checkFalsy: true }).isString().withMessage('Siswa dibutuhkan!'),
];

exports.validationMw = async (req, res, next) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    const errors = {};

    _.forEach(validationError.array(), (err) => {
      errors[err.param] = err.msg;
    });

    return res.status(400).json({ errors });
  }

  return next();
};
