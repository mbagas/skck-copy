const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TotalPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TotalPoint.belongsTo(models.Siswas, {
        foreignKey: 'siswaId',
        onDelete: 'CASCADE',
        as: 'siswa',
      });
    }
  }
  TotalPoint.init(
    {
      totalPoint: DataTypes.INTEGER,
      siswaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TotalPoints',
    }
  );
  return TotalPoint;
};
