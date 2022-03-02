const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrangTua extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrangTua.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user',
      });

      OrangTua.hasMany(models.Siswas, {
        foreignKey: 'orangTuaId',
        as: 'siswas',
      });
    }
  }
  OrangTua.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      alamat: DataTypes.STRING,
      noTelp: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrangTuas',
    }
  );
  return OrangTua;
};
