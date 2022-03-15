const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Guru extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guru.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user',
      });
    }
  }
  Guru.init(
    {
      namaLengkap: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      alamat: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Gurus',
    }
  );
  return Guru;
};
