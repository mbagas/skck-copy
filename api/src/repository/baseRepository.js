const _ = require('lodash');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');

/**
 * Get the conditions from the requested query
 * @param {string} condition
 * @returns {string} converted condition
 */
exports.getConditions = (condition) => {
  switch (condition) {
    case 'AND':
      return Op.and;
    case 'OR':
      return Op.or;
    default:
  }
};

/**
 * @param {Object} model
 * @param {Object} conditions
 * @param {Object} filterQueryParams
 * @param {Object} options              { limit, page, ... }
 * @return {function(*=, *, *=): Promise<{rows: Model[], count: number}>}
 */
exports.findAll =
  (model) =>
  (conditions, filterQueryParams = {}, options = {}) => {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset = options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset', 'filters']);

    // translate filterQueryParams to sequelize conditions
    // only works for AND | OR condition for now
    // by default will use AND condition
    const rules = [];
    const { condition } = filterQueryParams;

    _.forEach(filterQueryParams.rules, ({ field, operator, value }) => {
      let sequelizeOp = null;
      let sequelizeValue = value;
      switch (operator) {
        case '=':
          sequelizeOp = Op.eq;
          break;
        case '>':
          sequelizeOp = Op.gt;
          break;
        case '<':
          sequelizeOp = Op.lt;
          break;
        case '>=':
          sequelizeOp = Op.gte;
          break;
        case '<=':
          sequelizeOp = Op.lte;
          break;
        case 'CONTAINS':
          sequelizeOp = Op.like;
          sequelizeValue = `%${value}%`;
          break;
        case 'IN':
          sequelizeOp = Op.in;
          break;
        default:
          sequelizeOp = operator;
      }

      // Need to wrap the value with DATE() function if want to compare date using YYYY-MM-DD format
      if (moment(sequelizeValue, 'YYYY-MM-DD', true).isValid()) {
        rules.push(
          Sequelize.where(Sequelize.fn('Date', Sequelize.col(field)), sequelizeOp, sequelizeValue)
        );
      } else {
        rules.push({
          [field]: { [sequelizeOp]: sequelizeValue },
        });
      }
    });

    const where = { ...conditions };
    if (where[Op.and]) {
      where[Op.and] = [...where[Op.and], ...rules];
    } else {
      const queryCond = this.getConditions(condition) || Op.and;
      where[queryCond] = rules;
    }

    return model.findAndCountAll({
      where,
      ...(limit === 0 ? {} : { limit }),
      offset,
      ...otherOptions,
    });
  };

/**
 * Create a new record on the model
 *
 * @param {Object} model
 * @returns
 */
exports.create = (model) => (data) => model.create(data);

/**
 * update by id or a set conditions
 *
 * @param {Object} model
 * @param {Object|number} conditions
 * @param {Object} data
 */
exports.update = (model) => (conditions, data) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };
  return model.update(data, { where: dbCond });
};

/**
 * delete multiple records by conditions
 *
 * @param {Object} model
 */
exports.delete = (model) => (conditions) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };
  return model.destroy({ where: dbCond });
};

/**
 * Find one by id, or by an object of conditions
 *
 * @param {Object} model
 * @param {Object|number} conditions
 * @param {Object} options
 */
exports.findOne =
  (model) =>
  (conditions, options = {}) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: conditions };
    return model.findOne({ where: dbCond, ...options });
  };

/**
 * Find one by id, or by any given conditions
 * If not found, create new data by the given data
 * If found, update the data by the given data
 * @param {Object} model
 * @param {Object|number} conditions
 * @param {Object} data
 */
exports.updateOrCreate = (model) => async (conditions, data) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

  const exist = await this.findOne(model)(dbCond);

  if (exist) return this.update(model)(dbCond, data);

  return this.create(model)(data);
};

/**
 * sanitize model object to API response data
 *
 * @param {Object} model
 * @return {Promise<Object>}
 */
exports.modelToResource = async (model) => model;

/**
 * sanitize API request data to model object
 *
 * @param {Object} resource
 * @return {Promise<Object>}
 */
exports.resourceToModel = async (resource) => resource;

exports.factory = (model) => ({
  findAll: exports.findAll(model),
  findOne: exports.findOne(model),
  updateOrCreate: exports.updateOrCreate(model),
  create: exports.create(model),
  update: exports.update(model),
  delete: exports.delete(model),
  modelToResource: exports.modelToResource,
  resourceToModel: exports.resourceToModel,
});
