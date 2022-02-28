const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');
const { USER_ROLE } = require('../utils/constants');

exports.getGuruMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  const userAuthId = parseInt(userAuth.id, 10);

  const guru = await repository.guru.findOne(req.params.id);

  if (!guru) return res.status(404).json({ message: 'Guru not found' });

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

exports.getGurusMw = asyncMw(async (req, res, next) => {
  req.gurus = await repository.guru.findAll({}, req.filterQueryParams, req.query);

  return next();
});

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

exports.returnGuruMw = asyncMw(async (req, res) => {
  const { guru } = req;

  return res.json(await repository.guru.modelToResource(guru));
});

exports.returnGurusMw = asyncMw(async (req, res) => {
  const { gurus } = req;

  return res.json({
    rows: await Promise.all(_.map(gurus.rows, (guru) => repository.guru.modelToResource(guru))),
    count: _.get(req, 'gurus.count', 0),
  });
});
