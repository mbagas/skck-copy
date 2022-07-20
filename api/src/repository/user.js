const _ = require('lodash');
const siswaRepository = require('./siswa');
const guruRepository = require('./guru');
const orangTuaRepository = require('./orangtua');
const { Users } = require('../models');
const { USER_ROLE } = require('../utils/constants');
const { hashText, compareText } = require('../utils/encryption');
const { getUserRole } = require('../utils/user');
const { factory } = require('./baseRepository');
const { getUserNameFromRole, checkIfRowValid } = require('../utils/common');
const userRoleSchema = require('../utils/validator/schema');

const userRepository = factory(Users);

const repository = {
  siswa: siswaRepository,
  guru: guruRepository,
  orang_tua: orangTuaRepository,
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

userRepository.findByUsernameAndRole = async (resource) =>
  userRepository.findOne({
    userName: resource.userName,
    role: resource.role,
  });

userRepository.findByUserRole = async (role, id) =>
  repository[getUserRole(role)].findOne({
    userId: id,
  });

userRepository.checkUserExist = async (resource) => {
  const userByUserName = await userRepository.findByUsernameAndRole(resource);
  if (!userByUserName) return;

  // If the user requested is an admin and no user found then return false
  // We will cut off the process so that the admin will not populate other user table
  if (resource.role === USER_ROLE.ADMIN) return userByUserName;

  const userByRole = await userRepository.findByUserRole(resource.role, userByUserName.id);

  if (!userByRole) return;
  return userByRole;
};

userRepository.conditionalCreate = async (resource) => {
  const resourceRole = getUserRole(resource.role);

  const isExist = await userRepository.checkUserExist(resource);

  if (isExist) return;

  const userData = await userRepository.resourceToModel(resource);
  const user = await userRepository.create(userData);

  // If the username is not exist and the role is admin
  // create only admin account and stop the process
  if (resourceRole === USER_ROLE.ADMIN) return user;

  const roleData = await repository[resourceRole].resourceToModel(resource);
  const role = await repository[resourceRole].create({
    ...roleData,
    userId: user.id,
  });

  return role;
};

userRepository.conditionalUpdate = async (id, resource) => {
  const role = getUserRole(resource.role);

  const user = await repository[role].findOne({ userId: id });

  // If the user is not found then cut off the process
  if (!user) return;

  const body = await repository[role].resourceToModel(resource);
  await repository[role].update(user.id, body);
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

userRepository.bulkCreateAdmins = (resources) =>
  _.map(resources, async (resource) => {
    const userName = getUserNameFromRole(resource, USER_ROLE.ADMIN);

    if (_.isNil(userName)) return;

    const user = await userRepository.findByUsernameAndRole({
      userName,
      role: USER_ROLE.ADMIN,
    });

    if (user) return;

    if (!resource.password) {
      // eslint-disable-next-line no-param-reassign
      resource.password = resource.userName;
    }

    const isRowValid = await checkIfRowValid(resource, userRoleSchema[USER_ROLE.ADMIN]);

    if (!isRowValid) return;

    await userRepository.conditionalCreate({
      ...resource,
      role: USER_ROLE.ADMIN,
    });
  });

userRepository.bulkCreateConditional = (resources, role) =>
  _.map(resources, async (resource) => {
    const userName = getUserNameFromRole(resource, role);

    if (_.isNil(userName)) return;

    const user = await userRepository.findByUsernameAndRole({
      userName,
      role,
    });

    if (user) return;

    /* eslint-disable no-param-reassign */
    resource.userName = userName;
    // Set user password to their own username
    resource.password = userName;
    /* eslint-enable no-param-reassign */

    const isRowValid = await checkIfRowValid(resource, userRoleSchema[role]);

    if (!isRowValid) return;

    const newUser = await userRepository.conditionalCreate({
      ...resource,
      role,
    });

    if (role === USER_ROLE.SISWA && resource.telpOrangTua) {
      const orangTua = await orangTuaRepository.findOne({
        noTelp: resource.telpOrangTua,
      });

      if (orangTua) {
        await siswaRepository.update(newUser.id, {
          orangTuaId: orangTua.id,
        });
      }
    }
  });

module.exports = userRepository;
