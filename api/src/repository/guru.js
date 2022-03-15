const _ = require('lodash');
const { Gurus } = require('../models');
const { factory } = require('./baseRepository');

const guruRepository = factory(Gurus);

guruRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['namaLengkap', 'jabatan', 'alamat', 'userId']);

  return model;
};

guruRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['createdAt', 'updatedAt']);
};

module.exports = guruRepository;
