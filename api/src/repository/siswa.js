const _ = require('lodash');
const { Siswas } = require('../models');
const { factory } = require('./baseRepository');

const siswaRepository = factory(Siswas);

siswaRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['nisn', 'nis', 'namaLengkap', 'alamat', 'userId', 'orangTuaId']);

  return model;
};

siswaRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['createdAt', 'updatedAt']);
};

module.exports = siswaRepository;
