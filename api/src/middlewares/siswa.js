const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { isAdminOrGuru } = require('../utils/user');
const { USER_ROLE } = require('../utils/constants');
const { generateToken } = require('../utils/token');
const { Pelanggarans, KategoriPelanggarans } = require('../models');

// Get siswa data by id.
exports.getSiswaMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const siswa = await repository.siswa.findOne(req.params.id, {
    include: [
      {
        model: Pelanggarans,
        as: 'pelanggarans',
        include: {
          model: KategoriPelanggarans,
          as: 'kategoriPelanggaran',
        },
      },
    ],
  });

  // If selected siswa is not found, return a 404 error.
  if (!siswa) return res.status(404).json({ message: 'Siswa not found' });

  const siswaId = parseInt(siswa.userId, 10);

  // Check if it has an access to the selected siswa.
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

// Get all siswa data
exports.getSiswasMw = asyncMw(async (req, res, next) => {
  req.siswas = await repository.siswa.findAll({}, req.filterQueryParams, req.query);

  return next();
});

// Update siswa by requested id.
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

// Return selected siswa data.
exports.returnSiswaMw = asyncMw(async (req, res) => {
  const { siswa } = req;

  return res.json({
    ...(await repository.siswa.modelToResource(siswa)),
    pelanggarans: await Promise.all(
      _.map(siswa.pelanggarans, (pelanggaran) =>
        repository.pelanggaran.modelToResource(pelanggaran)
      )
    ),
  });
});

// Return all siswa data.
exports.returnSiswasMw = asyncMw(async (req, res) => {
  const { siswas } = req;

  return res.json({
    rows: await Promise.all(_.map(siswas.rows, (siswa) => repository.siswa.modelToResource(siswa))),
    count: _.get(req, 'siswas.count', 0),
  });
});

// Login siswa by getting the username and match it with password
// Return the jwt token with siswa id if the username and password match
exports.loginMw = asyncMw(async (req, res) => {
  // Check if the user match or not
  const userMatch = await repository.user.loginValdations(req.body);

  // userMatch empty object
  if (_.isEmpty(userMatch)) return res.status(404).json({ message: 'User not found' });

  if (!userMatch.isMatch) return res.status(401).json({ message: 'Wrong password' });

  const userId = userMatch.user.id;

  const siswa = await repository.siswa.findOne({ userId });

  const token = await generateToken(_.pick(siswa, ['id']), req.body.always);

  return res.status(200).json({ token, id: siswa.id, userId });
});
