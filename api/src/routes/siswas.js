const router = require('express').Router();
const user = require('../middlewares/user');
const siswa = require('../middlewares/siswa');

// GET /siswa
router.get('/', user.authMw, siswa.getSiswasMw, siswa.returnSiswasMw);
// GET /siswas/:id
router.get('/:id', user.authMw, siswa.getSiswaMw, siswa.returnSiswaMw);

// PATCH /siswas/:id
router.patch(
  '/:id',
  user.authMw,
  siswa.getSiswaMw,
  siswa.updateSiswaMw,
  siswa.getSiswaMw,
  siswa.returnSiswaMw
);

module.exports = router;
