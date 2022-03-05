const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constants');
const { generateToken } = require('../utils/token');

// Get orang tua data by id.
exports.getOrangTuaMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const orangTua = await repository.orangTua.findOne(req.params.id, {
    include: [
      {
        model: Siswa,
        as: 'siswas',
      }
    ]
  });

  // If selected orang tua is not found, return a 404 error.
  if (!orangTua) return res.status(404).json({ message: 'Orang tua not found' });

  const orangTuaId = parseInt(orangTua.userId, 10);

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuthId !== orangTuaId && userAuth.role !== USER_ROLE.ADMIN) {
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
  await repository.orangTua.modelToResource(orangTua)
  return res.json({
    ...(await repository.orangTua.modelToResource(orangTua)),
    siswas: await Promise.all(
      _.map(
        orangTua.siswas,
        (siswas) => repository.siswas.modelToResource(siswas),
      )
    )
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
  if (_.isEmpty(userMatch)) return res.status(404).json({ message: 'User not found' });

  if (!userMatch.isMatch) return res.status(401).json({ message: 'Wrong password' });

  const userId = userMatch.user.id;

  const orangTua = await repository.orangTua.findOne({ userId });

  const token = await generateToken(_.pick(orangTua, ['id']), req.body.always);

  return res.status(200).json({ token, id: orangTua.id, userId });
});
