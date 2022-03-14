const _ = require('lodash');
const { OrangTuas } = require('../models');
const { factory } = require('./baseRepository');

const orangtuaRepository = factory(OrangTuas);

orangtuaRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['namaLengkap', 'alamat', 'noTelp', 'userId']);

  return model;
};

orangtuaRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['createdAt', 'updatedAt']);
};

module.exports = orangtuaRepository;
