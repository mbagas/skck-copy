const _ = require('lodash');
const { RelasiKeluargas } = require('../models');
const { factory } = require('./baseRepository');

const relasiRepository = factory(RelasiKeluargas);

relasiRepository.resourceToModel = (resource) => {
  const model = _.pick(resource, ['orangTuaId', 'siswaId']);

  return model;
};

relasiRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['updatedAt']);
};

module.exports = relasiRepository;
