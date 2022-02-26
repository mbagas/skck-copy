const router = require('express').Router();
const user = require('../middlewares/user');
const katPlgr = require('../middlewares/kategoriPelanggaran');

// POST /kategori-pelanggarans
router.post('/', user.authMw, katPlgr.createKatPlgrMw, katPlgr.returnKatPlgrMw);

// GET /kategori-pelanggarans
router.get('/', user.authMw, katPlgr.getKatPlgrsMw, katPlgr.returnKatPlgrsMw);
// GET /kategori-pelanggarans/:id
router.get('/:id', user.authMw, katPlgr.getKatPlgrMw, katPlgr.returnKatPlgrMw);

// PATCH /kategori-pelanggarans/:id
router.patch(
  '/:id',
  user.authMw,
  katPlgr.getKatPlgrMw,
  katPlgr.updateKatPlgrMw,
  katPlgr.getKatPlgrMw,
  katPlgr.returnKatPlgrMw
);

// DELETE /kategori-pelanggarans/:id
router.delete('/:id', user.authMw, katPlgr.getKatPlgrMw, katPlgr.deleteKatPlgrMw);

module.exports = router;
