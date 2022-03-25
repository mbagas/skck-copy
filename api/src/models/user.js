const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Gurus, {
        foreignKey: 'userId',
        as: 'orangTua',
      });

      User.hasOne(models.OrangTuas, {
        foreignKey: 'userId',
        as: 'guru',
      });

      User.hasOne(models.Siswas, {
        foreignKey: 'userId',
        as: 'siswa',
      });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return User;
};
