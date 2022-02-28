const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrangTua extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrangTua.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      alamat: DataTypes.STRING,
      noTelp: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      anakId: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'OrangTuas',
    }
  );
  return OrangTua;
};
