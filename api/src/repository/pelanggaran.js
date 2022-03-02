const _ = require('lodash');
const { Pelanggarans } = require('../models');
const { factory } = require('./baseRepository');

const pelanggaranRepository = factory(Pelanggarans);

pelanggaranRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['pelanggaranId', 'siswaId']);

  return model;
};

pelanggaranRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['updatedAt']);
};

pelanggaranRepository.bulkCreate = async (resources) => {
  const models = await Promise.all(
    _.map(resources, (resource) => pelanggaranRepository.resourceToModel(resource))
  );

  const result = await Pelanggarans.bulkCreate(models);
  return result;
};

module.exports = pelanggaranRepository;
