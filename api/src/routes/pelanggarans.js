const router = require('express').Router();
const user = require('../middlewares/user');
const pelanggaran = require('../middlewares/pelanggaran');
const validator = require('../middlewares/requestValidation');

// POST /pelanggarans
router.post(
  '/',
  user.authMw,
  validator.pelanggaranSchema,
  validator.validationMw,
  pelanggaran.createPelanggaranMw,
  pelanggaran.returnBulkPelanggaranMw
);

// GET /pelanggarans
router.get('/', user.authMw, pelanggaran.getPelanggaransMw, pelanggaran.returnPelanggaransMw);

// GET /pelanggarans/:id
router.get('/:id', user.authMw, pelanggaran.getPelanggaranMw, pelanggaran.returnPelanggaranMw);

// PATCH /pelanggarans/:id
router.patch(
  '/:id',
  user.authMw,
  pelanggaran.getPelanggaranMw,
  pelanggaran.updatePelanggaranMw,
  pelanggaran.getPelanggaranMw,
  pelanggaran.returnPelanggaranMw
);

// DELETE /pelanggarans/:id
router.delete('/:id', user.authMw, pelanggaran.getPelanggaranMw, pelanggaran.deletePelanggaranMw);

module.exports = router;
