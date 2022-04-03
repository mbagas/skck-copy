const router = require('express').Router();
const { linkShortenerUrl } = require('../middlewares/suratPeringatan');

// GET /sp/:siswaId/:spKe
router.get('/:siswaId/:spKe', linkShortenerUrl);

module.exports = router;
