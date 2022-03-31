const _ = require('lodash');
const siswaRepository = require('./siswa');
const guruRepository = require('./guru');
const orangTuaRepository = require('./orangtua');
const { Users } = require('../models');
const { USER_ROLE } = require('../utils/constants');
const { hashText, compareText } = require('../utils/encryption');
const { getUserRole } = require('../utils/user');
const { factory } = require('./baseRepository');

const userRepository = factory(Users);

const repository = {
  siswa: siswaRepository,
  guru: guruRepository,
  orangTua: orangTuaRepository,
};

userRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ['userName', 'role']);

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

  return role;
};

userRepository.conditionalUpdate = async (id, resource) => {
  const resourceRole = getUserRole(resource.role);

  const user = await repository[resourceRole].findOne({ userId: id });

  // If the user is not found then cut off the process
  if (!user) return;

  const body = await repository[resourceRole].resourceToModel(resource);
  await repository[resourceRole].update(user.id, body);
};

/**
 * Validate the user login data.
 * @param {Object} resource
 * @param {string} resource.userName
 * @param {string} resource.password
 * @returns {Promise<{user: Object, isMatch: boolean}>}
 */
userRepository.loginValdations = async (resource) => {
  const { userName, password } = resource;
  const user = await userRepository.findOne({ userName });

  // Return empty object if the user is not found
  if (!user) return {};

  // Check if the requested password is same with the hashed password in database.
  const isMatch = await compareText(password, user.password);

  // Return isMatch false
  if (!isMatch) {
    return {
      isMatch,
    };
  }

  // Return isMatch true and user data
  return {
    user,
    isMatch,
  };
};

module.exports = userRepository;
