const router = require('express').Router();
const user = require('../middlewares/user');
const grafik = require('../middlewares/grafik');

// GET /grafiks
router.get('/', grafik.getParamTimeSeriesMw);
module.exports = router;
