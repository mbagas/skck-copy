const router = require('express').Router();
const user = require('../middlewares/user');
const orangTua = require('../middlewares/orangtua');

// POST /orang-tuas/login
router.post('/login', orangTua.loginMw);

// GET /orang-tuas
router.get('/', user.authMw, orangTua.getOrangTuasMw, orangTua.returnOrangTuasMw);
// GET /orang-tuas/:id
router.get('/:id', user.authMw, orangTua.getOrangTuaMw, orangTua.returnOrangTuaMw);

// PATCH /orang-tuas/:id
router.patch(
  '/:id',
  user.authMw,
  orangTua.getOrangTuaMw,
  orangTua.updateOrangTuaMw,
  orangTua.getOrangTuaMw,
  orangTua.returnOrangTuaMw
);

module.exports = router;
