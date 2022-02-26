const router = require('express').Router();
const user = require('../middlewares/user');
const orangTua = require('../middlewares/orangtua');

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
