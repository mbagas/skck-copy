const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { isAdminOrGuru } = require('../utils/user');
const { USER_ROLE } = require('../utils/constants');

exports.getSiswaMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const siswa = await repository.siswa.findOne(req.params.id);

  if (!siswa) return res.status(404).json({ message: 'Siswa not found' });

  const siswaId = parseInt(siswa.userId, 10);

  const adminOrGuru = isAdminOrGuru(userAuth.role);

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuthId !== siswaId && adminOrGuru) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  req.siswa = siswa;

  return next();
});

exports.getSiswasMw = asyncMw(async (req, res, next) => {
  req.siswas = await repository.siswa.findAll({}, req.filterQueryParams, req.query);

  return next();
});

exports.updateSiswaMw = asyncMw(async (req, res, next) => {
  const { userAuth, siswa } = req;
  const userAuthId = parseInt(userAuth.id, 10);
  const siswaId = parseInt(siswa.userId, 10);

  const isAdmin = userAuth.role === USER_ROLE.ADMIN;
  const isUser = siswaId === userAuthId;

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (!isUser && !isAdmin) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const data = await repository.siswa.resourceToModel(req.body);
  await repository.siswa.update(req.params.id, data);

  return next();
});

exports.returnSiswaMw = asyncMw(async (req, res) => {
  const { siswa } = req;

  return res.json(await repository.siswa.modelToResource(siswa));
});

exports.returnSiswasMw = asyncMw(async (req, res) => {
  const { siswas } = req;

  return res.json({
    rows: await Promise.all(_.map(siswas.rows, (siswa) => repository.siswa.modelToResource(siswa))),
    count: _.get(req, 'siswas.count', 0),
  });
});
