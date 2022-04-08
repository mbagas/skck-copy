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

exports.getSPHistory = asyncMw(async (req, res) => {
  const { nis, spKe } = req.params;

  const siswa = await repository.siswa.findOne({ nis });

  const history = await repository.history.findOne({
    siswaId: siswa.id,
    spKe,
  });

  return res.json({
    history: await repository.history.modelToResource(history),
    siswa: await repository.siswa.modelToResource(siswa),
  });
});
