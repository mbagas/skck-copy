const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constants');
const { generateToken } = require('../utils/token');

// Get guru data by id.
exports.getGuruMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const guru = await repository.guru.findOne(req.params.id);

  // If selected guru is not found, return a 404 error.
  if (!guru) return res.status(404).json({ message: 'Guru tidak ditemukan' });

  const guruId = parseInt(guru.userId, 10);

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuthId !== guruId && userAuth.role !== USER_ROLE.ADMIN) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  req.guru = guru;

  return next();
});

// Get all guru data
exports.getGurusMw = asyncMw(async (req, res, next) => {
  req.gurus = await repository.guru.findAll({}, req.filterQueryParams, req.query);

  return next();
});

// Update guru by requested id.
exports.updateGuruMw = asyncMw(async (req, res, next) => {
  const { userAuth, guru } = req;
  const userAuthId = parseInt(userAuth.id, 10);
  const guruId = parseInt(guru.userId, 10);

  const isAdmin = userAuth.role === USER_ROLE.ADMIN;
  const isUser = guruId === userAuthId;

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (!isUser && !isAdmin) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const data = await repository.guru.resourceToModel(req.body);
  await repository.guru.update(req.params.id, data);

  return next();
});

// Return selected guru data.
exports.returnGuruMw = asyncMw(async (req, res) => {
  const { guru } = req;

  return res.json(await repository.guru.modelToResource(guru));
});

// Return all guru data.
exports.returnGurusMw = asyncMw(async (req, res) => {
  const { gurus } = req;

  return res.json({
    rows: await Promise.all(_.map(gurus.rows, (guru) => repository.guru.modelToResource(guru))),
    count: _.get(req, 'gurus.count', 0),
  });
});

// Login guru by getting the username and match it with password
// Return the jwt token with guru id if the username and password match
exports.loginMw = asyncMw(async (req, res) => {
  // Check if the user match or not
  const userMatch = await repository.user.loginValdations(req.body);

  // userMatch empty object
  if (_.isEmpty(userMatch)) return res.status(404).json({ message: 'User tidak ditemukan' });

  if (!userMatch.isMatch) return res.status(401).json({ message: 'Password salah' });

  const userId = userMatch.user.id;

  const guru = await repository.guru.findOne({ userId });

  if (!guru) return res.status(404).json({ message: 'Guru tidak ditemukan' });

  const token = await generateToken(
    {
      id: userId,
      accountId: guru.id,
      role: USER_ROLE.GURU,
    },
    req.body.always
  );

  return res.status(200).json({ token, id: guru.id, userId });
});

exports.changePasswordMw = asyncMw(async (req, res) => {
  const isMatch = await bcrypt.compare(req.body.oldPassword, req.guru.password);
  if (!isMatch) return res.status(401).json({ message: 'Password lama salah' });

  const isMatch2 = await bcrypt.compare(req.body.password, req.guru.password);
  if (isMatch2) {
    return res.status(401).json({ message: 'Password baru tidak boleh sama dengan password lama' });
  }

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(req.guru.userId, data);

  return res.json({ message: 'Password berhasil diperbarui' });
});
