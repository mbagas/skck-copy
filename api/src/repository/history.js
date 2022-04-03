const _ = require('lodash');
const { Histories } = require('../models');
const { SP_NAME, SP_LIMIT } = require('../utils/constants');
const { sentMessage } = require('../utils/sms');
const { factory } = require('./baseRepository');
const siswaRepository = require('./siswa');
const orangTuaRepository = require('./orangtua');

const historiesRepository = factory(Histories);

historiesRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['spKe', 'siswaId', 'shortUrl', 'longUrl', 'totalPoint']);

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

  const siswa = await siswaRepository.findOne(siswaId);
  const orangTua = await orangTuaRepository.findOne({ id: siswa.orangTuaId });

  if (!siswa || !orangTua) return;

  const SP1 = await historiesRepository.findOne({ spKe: SP_NAME.SP1, siswaId });
  const SP2 = await historiesRepository.findOne({ spKe: SP_NAME.SP2, siswaId });
  const SP3 = await historiesRepository.findOne({ spKe: SP_NAME.SP3, siswaId });

  // If the total point is greater than SP1 Limit, create a new SP1
  if (!SP1 && totalPoint >= SP_LIMIT.SP1) {
    const shortUrl = `${process.env.API_URL}/sp/${siswaId}/${SP_NAME.SP1}`;
    const longUrl = `${process.env.APP_URL}/sp/${siswa.nis}/${siswa.namaLengkap}/${SP_NAME.SP1}`;

    const data = await historiesRepository.resourceToModel({
      spKe: SP_NAME.SP1,
      siswaId,
      shortUrl,
      longUrl,
      totalPoint,
    });

    await historiesRepository.create(data);
    await sentMessage(orangTua.noTelp, `${shortUrl}`);
  }

  // If the total point is greater than SP2 Limit, create a new SP2
  if (!SP2 && totalPoint >= SP_LIMIT.SP2) {
    const shortUrl = `${process.env.API_URL}/sp/${siswaId}/${SP_NAME.SP2}`;
    const longUrl = `${process.env.APP_URL}/sp/${siswa.nis}/${siswa.namaLengkap}/${SP_NAME.SP2}`;

    const data = await historiesRepository.resourceToModel({
      spKe: SP_NAME.SP2,
      siswaId,
      shortUrl,
      longUrl,
      totalPoint,
    });

    await historiesRepository.create(data);
    await sentMessage(orangTua.noTelp, `${shortUrl}`);
  }

  // If the total point is greater than SP3 Limit, create a new SP3
  if (!SP3 && totalPoint >= SP_LIMIT.SP3) {
    const shortUrl = `${process.env.API_URL}/sp/${siswaId}/${SP_NAME.SP3}`;
    const longUrl = `${process.env.APP_URL}/sp/${siswa.nis}/${siswa.namaLengkap}/${SP_NAME.SP3}`;

    const data = await historiesRepository.resourceToModel({
      spKe: SP_NAME.SP3,
      siswaId,
      shortUrl,
      longUrl,
      totalPoint,
    });

    await historiesRepository.create(data);
    await sentMessage(orangTua.noTelp, `${shortUrl}`);
  }
};

historiesRepository.updateHistory = async (siswaId, totalPoint) => {
  // If one of the params is empty, stop the process immediately
  if (_.isNil(siswaId) || _.isNil(totalPoint)) return;

  const SP1 = await historiesRepository.findOne({ spKe: SP_NAME.SP1, siswaId });
  const SP2 = await historiesRepository.findOne({ spKe: SP_NAME.SP2, siswaId });
  const SP3 = await historiesRepository.findOne({ spKe: SP_NAME.SP3, siswaId });

  // Delete SP1, SP2, SP3 if the total is less than the SP Limit
  if (SP1 && totalPoint < SP_LIMIT.SP1) await historiesRepository.delete(SP1.id);
  if (SP2 && totalPoint < SP_LIMIT.SP2) await historiesRepository.delete(SP2.id);
  if (SP3 && totalPoint < SP_LIMIT.SP3) await historiesRepository.delete(SP3.id);
};

module.exports = historiesRepository;
