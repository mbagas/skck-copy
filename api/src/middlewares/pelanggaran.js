const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { isNotOrangTua, isAdminOrGuru } = require('../utils/user');
const { INCLUDE_KATEGORI } = require('../utils/constants');

// Create new Pelanggaran by a bulk request
exports.createPelanggaranMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const pelanggaransId = _.get(req.body, 'pelanggaransId');

  if (!isNotOrangTua(userAuth.role)) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  if (!pelanggaransId) return res.status(401).json({ message: 'Pelanggarans id is required' });

  req.body.pelanggaransId = _.isArray(pelanggaransId) ? pelanggaransId : [pelanggaransId];

  req.pelanggarans = await repository.pelanggaran.bulkCreate(req.body);

  return next();
});

// Get Pelanggaran data by pelanggaran id.
exports.getPelanggaranMw = asyncMw(async (req, res, next) => {
  const pelanggaran = await repository.pelanggaran.findOne(req.params.id);

  if (!pelanggaran) return res.status(404).json({ message: 'Pelanggaran tidak ditemukan' });

  req.pelanggaran = pelanggaran;

  return next();
});

// Get all Pelanggaran data
exports.getPelanggaransMw = asyncMw(async (req, res, next) => {
  const { siswa } = req;

  // If there is siswa in the request
  // Get pelanggarans by siswa id
  req.pelanggarans = await repository.pelanggaran.findAll(
    { ...(siswa && { siswaId: siswa.id }) },
    req.filterQueryParams,
    {
      ...(siswa && {
        include: INCLUDE_KATEGORI,
      }),
      ...req.query,
    }
  );

  return next();
});

// Update Pelanggaran by pelanggaran id.
exports.updatePelanggaranMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;

  if (!isAdminOrGuru(userAuth.role)) {
    return res.json({
      message: 'Forbidden',
    });
  }

  const data = await repository.pelanggaran.resourceToModel(req.body);
  await repository.pelanggaran.update(req.params.id, data);

  return next();
});

// Delete Pelanggaran by pelanggaran id.
exports.deletePelanggaranMw = asyncMw(async (req, res) => {
  const { userAuth } = req;

  if (!isAdminOrGuru(userAuth.role)) {
    return res.json({
      message: 'Forbidden',
    });
  }

  await repository.pelanggaran.delete(req.params.id);

  return res.status(204).json({
    id: req.params.id,
    message: 'Pelanggaran deleted',
  });
});

// Return selected pelanggran data.
exports.returnPelanggaranMw = asyncMw(async (req, res) => {
  const { pelanggaran } = req;

  return res.json(await repository.pelanggaran.modelToResource(pelanggaran));
});

// Return all pelanggran data.
exports.returnPelanggaransMw = asyncMw(async (req, res) => {
  const { pelanggarans } = req;

  return res.json({
    rows: await Promise.all(
      _.map(pelanggarans.rows, async (pelanggaran) => ({
        ...(await repository.pelanggaran.modelToResource(pelanggaran)),
        ...(req.siswa && {
          kategoriPelanggaran: await repository.katPlgr.modelToResource(
            pelanggaran.kategoriPelanggaran
          ),
        }),
      }))
    ),
    count: _.get(req, 'pelanggarans.count', 0),
  });
});

exports.returnBulkPelanggaranMw = asyncMw(async (req, res) => {
  const { pelanggarans } = req;

  return res.json(
    await Promise.all(
      _.map(pelanggarans, (pelanggaran) => repository.pelanggaran.modelToResource(pelanggaran))
    )
  );
});
