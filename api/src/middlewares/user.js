const _ = require('lodash');
const jwt = require('jsonwebtoken');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constants');
const { isAdminOrGuru } = require('../utils/user');
const { generateToken } = require('../utils/token');

exports.authMw = asyncMw(async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.split(' ')[1];

  jwt.verify(bearerToken, process.env.JWT_TOKEN_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.userAuth = await repository.user.findByPk(payload.id);
    return next();
  });
});

exports.createUserMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.role !== USER_ROLE.ADMIN) return res.status(403).json({ message: 'Forbidden' });

  const generatedUser = await repository.user.conditionalCreate(req.body);

  if (_.isEmpty(generatedUser)) {
    return res.status(400).json({ message: 'User with this username and Role already exists' });
  }

  req.user = generatedUser;

  return next();
});

exports.getUserMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const paramsId = parseInt(req.params.id, 10);
  const userAuthId = parseInt(userAuth.id, 10);

  const adminOrGuru = isAdminOrGuru(userAuth.role);

  // If userAuth is not and admin and does not match the id in params,
  // then return a forbidden error.
  if (userAuthId !== paramsId && adminOrGuru) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const user = await repository.user.findOne(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  req.user = user;

  return next();
});

exports.getUsersMw = asyncMw(async (req, res, next) => {
  req.users = await repository.user.findAll({}, req.filterQueryParams, req.query);

  return next();
});

exports.updateUserMw = asyncMw(async (req, res, next) => {
  const { userAuth, user } = req;
  const paramsId = parseInt(user.id, 10);
  const userAuthId = parseInt(userAuth.id, 10);

  const isAdmin = userAuth.role === USER_ROLE.ADMIN;
  const isUser = paramsId === userAuthId;

  if (!isAdmin && !isUser) return res.status(403).json({ message: 'Forbidden' });

  if (req.body.role && !isAdmin) delete req.body.role;

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(req.params.id, data);

  return next();
});

exports.updateUserByRoleMw = asyncMw(async (req, res, next) => {
  // If the updated one is an admin, then skip the process
  if (req.body.role === USER_ROLE.ADMIN) return next();

  await repository.user.conditionalUpdate(req.params.id, req.body);

  return next();
});

exports.deleteUserMw = asyncMw(async (req, res) => {
  const { userAuth } = req;

  if (userAuth.role !== USER_ROLE.ADMIN) return res.status(403).json({ message: 'Forbidden' });

  await repository.user.delete(req.params.id);

  return res.status(204).json({
    id: req.params.id,
    message: 'User deleted',
  });
});

exports.returnConditionalUserMw = asyncMw(async (req, res) => {
  const {
    user,
    body: { role },
  } = req;

  return res.json(await repository[role || USER_ROLE.SISWA].modelToResource(user));
});

exports.returnUserMw = asyncMw(async (req, res) => {
  const { user } = req;

  return res.json(await repository.user.modelToResource(user));
});

exports.returnUsersMw = asyncMw(async (req, res) => {
  const { users } = req;

  return res.json({
    rows: await Promise.all(_.map(users.rows, (user) => repository.user.modelToResource(user))),
    count: _.get(req, 'users.count', 0),
  });
});

// Login admin by getting the username and match it with password
// Return the jwt token with admin id if the username and password match
exports.loginMw = asyncMw(async (req, res) => {
  // Check if the user match or not
  const userMatch = await repository.user.loginValdations(req.body);

  // userMatch empty object
  if (_.isEmpty(userMatch)) return res.status(404).json({ message: 'User not found' });

  if (!userMatch.isMatch) return res.status(401).json({ message: 'Wrong password' });

  const token = await generateToken(
    {
      id: userMatch.user.id,
      accountId: userMatch.user.id,
      role: USER_ROLE.ADMIN,
    },
    req.body.always
  );

  return res.status(200).json({ token, id: userMatch.user.id });
});
