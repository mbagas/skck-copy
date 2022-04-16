const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { isAdminOrGuru } = require('../utils/user');
const { USER_ROLE, INCLUDE_SISWA } = require('../utils/constants');
const { generateToken } = require('../utils/token');

// Get orang tua data by id.
exports.getOrangTuaMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const orangTua = await repository.orangTua.findOne(req.params.id, {
    include: [INCLUDE_SISWA],
  });

  // If selected orang tua is not found, return a 404 error.
  if (!orangTua) return res.status(404).json({ message: 'Orang tua tidak ditemukan' });

  const orangTuaId = parseInt(orangTua.userId, 10);
  const adminOrGuru = isAdminOrGuru(userAuth.role);

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuthId !== orangTuaId && !adminOrGuru) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  req.orangTua = orangTua;

  return next();
});

// Get all orang tua data.
exports.getOrangTuasMw = asyncMw(async (req, res, next) => {
  req.orangTuas = await repository.orangTua.findAll({}, req.filterQueryParams, req.query);

  return next();
});

// Update orang tua by requested id.
exports.updateOrangTuaMw = asyncMw(async (req, res, next) => {
  const { userAuth, orangTua } = req;
  const userAuthId = parseInt(userAuth.id, 10);
  const orangTuaId = parseInt(orangTua.userId, 10);

  const isAdmin = userAuth.role === USER_ROLE.ADMIN;
  const isUser = orangTuaId === userAuthId;

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (!isUser && !isAdmin) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const data = await repository.orangTua.resourceToModel(req.body);
  await repository.orangTua.update(req.params.id, data);

  return next();
});

// Return selected orang tua data.
exports.returnOrangTuaMw = asyncMw(async (req, res) => {
  const { orangTua } = req;
  await repository.orangTua.modelToResource(orangTua);
  return res.json({
    ...(await repository.orangTua.modelToResource(orangTua)),
    siswas: await Promise.all(
      _.map(orangTua.siswas, (siswas) => repository.siswa.modelToResource(siswas))
    ),
  });
});

// Return all orang tua data.
exports.returnOrangTuasMw = asyncMw(async (req, res) => {
  const { orangTuas } = req;

  return res.json({
    rows: await Promise.all(
      _.map(orangTuas.rows, (orangTua) => repository.orangTua.modelToResource(orangTua))
    ),
    count: _.get(req, 'orangTuas.count', 0),
  });
});

// Login orang tua by getting the username and match it with password
// Return the jwt token with orang tua id if the username and password match
exports.loginMw = asyncMw(async (req, res) => {
  // Check if the user match or not
  const userMatch = await repository.user.loginValdations(req.body);

  // userMatch empty object
  if (_.isEmpty(userMatch)) return res.status(404).json({ message: 'User tidak ditemukan' });

  if (!userMatch.isMatch) return res.status(401).json({ message: 'Password salah' });

  const userId = userMatch.user.id;

  const orangTua = await repository.orangTua.findOne({ userId });

  if (!orangTua) return res.status(404).json({ message: 'Orang Tua tidak ditemukan' });

  const token = await generateToken(
    {
      id: userId,
      accountId: orangTua.id,
      role: USER_ROLE.ORANG_TUA,
    },
    req.body.always
  );

  return res.status(200).json({ token, id: orangTua.id, userId });
});

exports.changePasswordMw = asyncMw(async (req, res) => {
  const userAuthId = parseInt(req.userAuth.id, 10);
  const orangTuaId = parseInt(req.orangTua.userId, 10);

  // If the userAuth is not an admin and does not match the id in params,
  // then return a forbidden error.
  if (req.userAuth.role !== USER_ROLE.ADMIN && userAuthId !== orangTuaId) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const user = await repository.user.findOne(orangTuaId);

  const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Password lama salah' });

  const isMatch2 = await bcrypt.compare(req.body.password, user.password);
  if (isMatch2) {
    return res.status(401).json({ message: 'Password baru tidak boleh sama dengan password lama' });
  }

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(orangTuaId, data);

  return res.json({ message: 'Password berhasil diperbarui' });
});
