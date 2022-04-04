const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { isAdminOrGuru } = require('../utils/user');
const {
  USER_ROLE,
  INCLUDE_ORANG_TUA,
  INCLUDE_TOTAL_POINT,
  INCLUDE_HISTORY,
  INCLUDE_HISTORY_SISWA,
} = require('../utils/constants');
const { generateToken } = require('../utils/token');

// Get siswa data by id.
exports.getSiswaMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const siswa = await repository.siswa.findOne(req.params.id, {
    include: [INCLUDE_ORANG_TUA, INCLUDE_HISTORY, INCLUDE_TOTAL_POINT],
  });

  // If selected siswa is not found, return a 404 error.
  if (!siswa) return res.status(404).json({ message: 'Siswa not found' });

  const siswaId = parseInt(siswa.userId, 10);

  // Check if it has an access to the selected siswa.
  const adminOrGuru = isAdminOrGuru(userAuth.role);
  const isOrangTua = userAuth.id === siswa.orangTuaId;

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuthId !== siswaId && !adminOrGuru && !isOrangTua) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  req.siswa = siswa;

  return next();
});

// Get all siswa data
exports.getSiswasMw = asyncMw(async (req, res, next) => {
  const spKe = _.get(req, 'query.spKe', null);
  const isValidFilter = !_.isNil(spKe) && _.trim(spKe) && _.isNumber(_.toNumber(spKe));

  const include = [INCLUDE_TOTAL_POINT];
  if (isValidFilter) include.push(INCLUDE_HISTORY_SISWA(spKe));

  req.siswas = await repository.siswa.findAll({}, req.filterQueryParams, {
    include,
    ...req.query,
  });

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
    totalPoint: _.get(siswa, 'totalPoint.totalPoint', 0),
    orangTua: await repository.orangTua.modelToResource(siswa.orangTua),
    histories: await Promise.all(siswa.histories, (history) =>
      repository.history.modelToResource(history)
    ),
  });
});

// Return all siswa data.
exports.returnSiswasMw = asyncMw(async (req, res) => {
  const { siswas } = req;

  return res.json({
    rows: await Promise.all(
      _.map(siswas.rows, async (siswa) => {
        const data = {
          ...(await repository.siswa.modelToResource(siswa)),
          totalPoint: _.get(siswa, 'totalPoint.totalPoint', 0),
        };

        delete data.histories;

        return data;
      })
    ),
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

  if (!siswa) return res.status(404).json({ message: 'Siswa not found' });

  const token = await generateToken(
    {
      id: userId,
      accountId: siswa.id,
      role: USER_ROLE.SISWA,
    },
    req.body.always
  );

  return res.status(200).json({ token, id: siswa.id, userId });
});

exports.changePasswordMw = asyncMw(async (req, res) => {
  const { userAuth } = req;

  const userAuthId = parseInt(userAuth.id, 10);
  const siswaId = parseInt(req.siswa.userId, 10);

  // If the userAuth is not an admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuth.role !== USER_ROLE.ADMIN && userAuthId !== siswaId) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const isMatch = await bcrypt.compare(req.body.oldPassword, req.siswa.password);
  if (!isMatch) return res.status(401).json({ message: 'Wrong old password!' });

  const isMatch2 = await bcrypt.compare(req.body.password, req.siswa.password);
  if (isMatch2) return res.status(401).json({ message: 'New password is same as old password!' });

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(req.siswa.userId, data);

  return res.json({ message: 'Password updated sucessfully!' });
});
