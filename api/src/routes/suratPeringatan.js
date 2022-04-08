const router = require('express').Router();
const { linkShortenerUrl, getSPHistory } = require('../middlewares/suratPeringatan');

// GET /sp/spGenerator/:nis/:spKe
router.get('/spGenerator/:nis/:spKe', getSPHistory);

// GET /sp/:siswaId/:spKe
router.get('/:siswaId/:spKe', linkShortenerUrl);

module.exports = router;
