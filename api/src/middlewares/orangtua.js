const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constants');

exports.getOrangTuaMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const orangTua = await repository.orangTua.findOne(req.params.id);

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

exports.getOrangTuasMw = asyncMw(async (req, res, next) => {
  req.orangTuas = await repository.orangTua.findAll({}, req.filterQueryParams, req.query);

  return next();
});

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

exports.returnOrangTuaMw = asyncMw(async (req, res) => {
  const { orangTua } = req;

  return res.json(await repository.orangTua.modelToResource(orangTua));
});

exports.returnOrangTuasMw = asyncMw(async (req, res) => {
  const { orangTuas } = req;

  return res.json({
    rows: await Promise.all(
      _.map(orangTuas.rows, (orangTua) => repository.orangTua.modelToResource(orangTua))
    ),
    count: _.get(req, 'orangTuas.count', 0),
  });
});
