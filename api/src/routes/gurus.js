const router = require('express').Router();
const user = require('../middlewares/user');
const guru = require('../middlewares/guru');

// POST /gurus/login
router.post('/login', guru.loginMw);

// GET /gurus
router.get('/', user.authMw, guru.getGurusMw, guru.returnGurusMw);
// GET /gurus/:id
router.get('/:id', user.authMw, guru.getGuruMw, guru.returnGuruMw);

// PATCH /gurus/:id
router.patch(
  '/:id',
  user.authMw,
  guru.getGuruMw,
  guru.updateGuruMw,
  guru.getGuruMw,
  guru.returnGuruMw
);

module.exports = router;
