const _ = require('lodash');
const { TotalPoints } = require('../models');
const { factory } = require('./baseRepository');
const historiesRepository = require('./history');
const katPlgrRepository = require('./kategoriPelanggaran');
const pelanggaranRepository = require('./pelanggaran');

const totalPointRepository = factory(TotalPoints);

totalPointRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['totalPoint', 'siswaId']);

  return model;
};

totalPointRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['createdAt', 'updatedAt']);
};

totalPointRepository.generateTotalPoint = async (resource) => {
  let totalPoint = 0;
  const { siswaId, pelanggaranId } = resource;

  const totalPointModel = await totalPointRepository.findOne({
    siswaId,
  });

  // Get kategori pelanggaran
  // Since we need the point for the total point
  const pelanggaran = await katPlgrRepository.findOne(pelanggaranId);

  // Create a new row if the total point is not found
  if (!totalPointModel) {
    totalPoint = parseInt(pelanggaran.poin, 10);

    const data = await totalPointRepository.resourceToModel({
      siswaId,
      totalPoint,
    });

    await totalPointRepository.create(data);
  } else {
    totalPoint = parseInt(totalPointModel.totalPoint, 10) + parseInt(pelanggaran.poin, 10);

    const data = await totalPointRepository.resourceToModel({
      totalPoint,
    });

    // Update existing total point
    await totalPointRepository.update(totalPointModel.id, data);
  }

  await historiesRepository.generateHistory(siswaId, totalPoint);
};

totalPointRepository.generateTotalPoints = async (resources) => {
  let totalPoint = 0;
  let siswaId = null;

  await Promise.all(
    _.map(resources, async (resource) => {
      const { pelanggaranId, siswaId: resSiswaId } = resource;

      const pelanggaran = await katPlgrRepository.findOne(pelanggaranId);

      if (pelanggaran) totalPoint += parseInt(pelanggaran.poin, 10);
      if (_.isNil(siswaId)) siswaId = resSiswaId;
    })
  );

  const totalPointModel = await totalPointRepository.findOne({
    siswaId,
  });

  // Create a new row if the total point is not found
  if (!totalPointModel) {
    const data = await totalPointRepository.resourceToModel({
      siswaId,
      totalPoint,
    });

    await totalPointRepository.create(data);
  } else {
    totalPoint += totalPointModel.totalPoint;

    const data = await totalPointRepository.resourceToModel({
      totalPoint,
    });

    // Update existing total point
    await totalPointRepository.update(totalPointModel.id, data);
  }

  await historiesRepository.generateHistory(siswaId, totalPoint);
};

totalPointRepository.recalculateTotalPoint = async (pelanggaran) => {
  const katPlgr = await katPlgrRepository.findOne(pelanggaran.pelanggaranId);
  const totalPointModel = await totalPointRepository.findOne({ siswaId: pelanggaran.siswaId });

  if (!totalPointModel) return;

  // Update existing total point
  // The minimal value of totalPoint is 0, using max to prevent negative value
  const totalPoint = Math.max(
    parseInt(totalPointModel.totalPoint, 10) - parseInt(katPlgr.poin, 10),
    0
  );

  const data = await totalPointRepository.resourceToModel({
    totalPoint,
  });

  await totalPointRepository.update(totalPointModel.id, data);
  await historiesRepository.updateHistory(pelanggaran.siswaId, totalPoint);
};

module.exports = totalPointRepository;
