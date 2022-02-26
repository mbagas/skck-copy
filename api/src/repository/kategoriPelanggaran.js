const _ = require('lodash');
const { KategoriPelanggarans } = require('../models');
const { factory } = require('./baseRepository');

const kategoriPelanggaranRespository = factory(KategoriPelanggarans);

kategoriPelanggaranRespository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['namaKategori', 'poin']);

  return model;
};

kategoriPelanggaranRespository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['createdAt', 'updatedAt']);
};

module.exports = kategoriPelanggaranRespository;
