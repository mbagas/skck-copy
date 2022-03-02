const router = require('express').Router();
const user = require('../middlewares/user');
const siswa = require('../middlewares/siswa');
const pelanggaranRoutes = require('./pelanggarans');

// POST /siswas/login
router.post('/login', siswa.loginMw);

// GET /siswas
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

// { POST, GET, PATCH, DELETE } /siswas/:id/pelanggarans
router.use('/:id/pelanggarans', user.authMw, siswa.getSiswaMw, pelanggaranRoutes);

module.exports = router;
