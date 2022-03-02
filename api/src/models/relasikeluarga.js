const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RelasiKeluarga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RelasiKeluarga.init(
    {
      orangTuaId: DataTypes.INTEGER,
      siswaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RelasiKeluargas',
    }
  );
  return RelasiKeluarga;
};
