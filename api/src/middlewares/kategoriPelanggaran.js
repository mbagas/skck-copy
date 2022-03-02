const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constants');

exports.createKatPlgrMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.role !== USER_ROLE.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const data = await repository.katPlgr.resourceToModel(req.body);
  req.kategoriPelanggaran = await repository.katPlgr.create(data);

  return next();
});

exports.getKatPlgrMw = asyncMw(async (req, res, next) => {
  req.kategoriPelanggaran = await repository.katPlgr.findOne(req.params.id);

  return next();
});

exports.getKatPlgrsMw = asyncMw(async (req, res, next) => {
  req.kategoriPelanggarans = await repository.katPlgr.findAll({}, req.filterQueryParams, req.query);

  return next();
});

exports.updateKatPlgrMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.role !== USER_ROLE.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const data = await repository.katPlgr.resourceToModel(req.body);
  await repository.katPlgr.update(req.params.id, data);

  return next();
});

exports.deleteKatPlgrMw = asyncMw(async (req, res) => {
  if (req.userAuth.role !== USER_ROLE.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await repository.katPlgr.delete(req.params.id);

  return res.status(204).json({
    id: req.params.id,
    message: 'Kategori Pelanggaran deleted',
  });
});

exports.returnKatPlgrMw = asyncMw(async (req, res) => {
  const { kategoriPelanggaran } = req;

  return res.json(await repository.katPlgr.modelToResource(kategoriPelanggaran));
});

exports.returnKatPlgrsMw = asyncMw(async (req, res) => {
  const { kategoriPelanggarans } = req;

  return res.json({
    rows: await Promise.all(
      _.map(kategoriPelanggarans.rows, (katPlgr) => repository.katPlgr.modelToResource(katPlgr))
    ),
    count: _.get(req, 'kategoriPelanggarans.count', 0),
  });
});
