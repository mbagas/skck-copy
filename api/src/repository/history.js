const _ = require('lodash');
const { Histories } = require('../models');
const { SP_NAME, SP_LIMIT } = require('../utils/constants');
const { factory } = require('./baseRepository');

const historiesRepository = factory(Histories);

historiesRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['SPKe', 'siswaId']);

  return model;
};

historiesRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['updatedAt']);
};

// Put SMS Blast code in here later
historiesRepository.generateHistory = async (siswaId, totalPoint) => {
  // If one of the params is empty, stop the process immediately
  if (_.isNil(siswaId) || _.isNil(totalPoint)) return;

  const SP1 = await historiesRepository.findOne({ SPKe: SP_NAME.SP1, siswaId });
  const SP2 = await historiesRepository.findOne({ SPKe: SP_NAME.SP2, siswaId });
  const SP3 = await historiesRepository.findOne({ SPKe: SP_NAME.SP3, siswaId });

  // If the total point is greater than SP1 Limit, create a new SP1
  if (!SP1 && totalPoint >= SP_LIMIT.SP1) {
    const data = await historiesRepository.resourceToModel({
      SPKe: SP_NAME.SP1,
      siswaId,
      totalPoint,
    });

    await historiesRepository.create(data);
  }

  // If the total point is greater than SP2 Limit, create a new SP2
  if (!SP2 && totalPoint >= SP_LIMIT.SP2) {
    const data = await historiesRepository.resourceToModel({
      SPKe: SP_NAME.SP2,
      siswaId,
      totalPoint,
    });

    await historiesRepository.create(data);
  }

  // If the total point is greater than SP3 Limit, create a new SP3
  if (!SP3 && totalPoint >= SP_LIMIT.SP3) {
    const data = await historiesRepository.resourceToModel({
      SPKe: SP_NAME.SP3,
      siswaId,
      totalPoint,
    });

    await historiesRepository.create(data);
  }
};

historiesRepository.updateHistory = async (siswaId, totalPoint) => {
  // If one of the params is empty, stop the process immediately
  if (_.isNil(siswaId) || _.isNil(totalPoint)) return;

  const SP1 = await historiesRepository.findOne({ SPKe: SP_NAME.SP1, siswaId });
  const SP2 = await historiesRepository.findOne({ SPKe: SP_NAME.SP2, siswaId });
  const SP3 = await historiesRepository.findOne({ SPKe: SP_NAME.SP3, siswaId });

  // Delete SP1, SP2, SP3 if the total is less than the SP Limit
  if (SP1 && totalPoint < SP_LIMIT.SP1) await historiesRepository.delete(SP1.id);
  if (SP2 && totalPoint < SP_LIMIT.SP2) await historiesRepository.delete(SP2.id);
  if (SP3 && totalPoint < SP_LIMIT.SP3) await historiesRepository.delete(SP3.id);
};

module.exports = historiesRepository;
