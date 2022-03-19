const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Siswas, {
        foreignKey: 'siswaId',
        onDelete: 'CASCADE',
        as: 'siswa',
      });
    }
  }
  History.init(
    {
      spKe: DataTypes.INTEGER,
      siswaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Histories',
    }
  );
  return History;
};
