const { USER_ROLE } = require('./constants');

/**
 * Get username from the raw data on in the csv files
 * @param {object} userData
 * @param {string} role
 * @return {string} userName
 */
exports.getUserNameFromRole = (userData, role) => {
  switch (role) {
    case USER_ROLE.ADMIN:
      return userData.userName;
    case USER_ROLE.GURU:
      return userData.nipNrk;
    case USER_ROLE.ORANG_TUA:
      return userData.noTelp;
    case USER_ROLE.SISWA:
      return userData.nis;
    default:
  }
};

exports.checkIfRowValid = async (userData, validator) => {
  try {
    await validator.validate(userData);

    return true;
  } catch (er) {
    return false;
  }
};
