const _ = require('lodash');
const { USER_ROLE } = require('./constants');

exports.isAdminOrGuru = (role) => role === USER_ROLE.ADMIN || role === USER_ROLE.GURU;

exports.getUserRole = (role) => {
  switch (role) {
    case USER_ROLE.GURU:
      return USER_ROLE.GURU;
    case USER_ROLE.ORANG_TUA:
      return USER_ROLE.ORANG_TUA;
    case USER_ROLE.ADMIN:
      return USER_ROLE.ADMIN;
    default:
      return USER_ROLE.SISWA;
  }
};

// If the role is not orang tua
// but it has to be inside the USER_ROLE
exports.isNotOrangTua = (role) =>
  _.includes(_.toArray(USER_ROLE), role) && role !== USER_ROLE.ORANG_TUA;
