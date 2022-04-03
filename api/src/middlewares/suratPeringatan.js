const asyncMw = require('async-express-mw');
const repository = require('../repository');

exports.linkShortenerUrl = asyncMw(async (req, res) => {
  const { siswaId, spKe } = req.params;
  const history = await repository.history.findOne({
    siswaId,
    spKe,
  });

  res.redirect(history.longUrl);
});
