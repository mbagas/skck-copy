const _ = require('lodash');
const { Pelanggarans } = require('../models');
const { factory } = require('./baseRepository');
const totalPointRepository = require('./totalPoint');

const pelanggaranRepository = factory(Pelanggarans);

// Overwrite the default create method
pelanggaranRepository.create = async (resource) => {
  await totalPointRepository.generateTotalPoint(resource);

  const result = await Pelanggarans.create(resource);

  return result;
};

pelanggaranRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['pelanggaranId', 'siswaId']);

  return model;
};

pelanggaranRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['updatedAt']);
};

pelanggaranRepository.singleToMany = async (resource) => {
  const resources = _.map(resource.pelanggaransId, (pelanggaran) => ({
    pelanggaranId: pelanggaran,
    siswaId: resource.siswaId,
  }));

  return resources;
};

pelanggaranRepository.bulkCreate = async (resources) => {
  const models = await Promise.all(
    _.map(await pelanggaranRepository.singleToMany(resources), (resource) =>
      pelanggaranRepository.resourceToModel(resource)
    )
  );

  await totalPointRepository.generateTotalPoints(models);

  const result = await Pelanggarans.bulkCreate(models);
  return result;
};

pelanggaranRepository.delete = async (id) => {
  const pelanggaran = await pelanggaranRepository.findOne(id);
  await totalPointRepository.recalculateTotalPoint(pelanggaran);

  await Pelanggarans.destroy({
    where: {
      id,
    },
  });
};

module.exports = pelanggaranRepository;
