const _ = require('lodash');
const repository = require('.');
const { Users } = require('../models');
const { USER_ROLE } = require('../utils/constants');
const { hashText } = require('../utils/encryption');
const { getUserRole } = require('../utils/user');
const { factory } = require('./baseRepository');

const userRepository = factory(Users);

userRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['userName', 'firstName', 'lastName', 'role']);

  if (resource.password) model.password = await hashText(resource.password);

  return model;
};

userRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ['password', 'createdAt', 'updatedAt']);
};

userRepository.checkUserExist = async (resource) => {
  const userByUserName = await userRepository.findOne({ userName: resource.userName });

  if (!userByUserName) return false;

  // If the user requested is an admin then return true
  // We will cut off the process so that the admin will not populate other user table
  if (resource.role === USER_ROLE.ADMIN) return false;

  const userByRole = await repository[getUserRole(resource.role)].findOne({
    userId: userByUserName.id,
  });

  if (!userByRole) return false;

  return true;
};

userRepository.conditionalCreate = async (resource) => {
  const resourceRole = getUserRole(resource.role);

  const isExist = await userRepository.checkUserExist(resource);

  if (isExist) return {};

  // If the username is not exist and the role is admin
  // create only admin account and stop the process
  if (resourceRole === USER_ROLE.ADMIN) {
    return {
      ...(await userRepository.create(await userRepository.resourceToModel(resource))),
    };
  }

  const userData = await userRepository.resourceToModel(resource);
  const user = await userRepository.create(userData);

  const roleData = await repository[resourceRole].resourceToModel(resource);
  const role = await repository[resourceRole].create({
    ...roleData,
    userId: user.id,
  });

  return {
    ...role,
    role: user.role,
  };
};

module.exports = userRepository;
