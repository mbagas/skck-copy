const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Siswa.belongsTo(models.OrangTuas, {
        foreignKey: 'orangTuaId',
        onDelete: 'CASCADE',
        as: 'orangTua',
      });

      Siswa.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user',
      });

      Siswa.hasMany(models.Pelanggarans, {
        foreignKey: 'siswaId',
        as: 'pelanggarans',
      });

      Siswa.hasMany(models.Histories, {
        foreignKey: 'siswaId',
        as: 'histories',
      });

      Siswa.hasOne(models.TotalPoints, {
        foreignKey: 'siswaId',
        as: 'totalPoint',
      });
    }
  }
  Siswa.init(
    {
      nisn: DataTypes.INTEGER,
      nis: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      alamat: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      orangTuaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Siswas',
    }
  );
  return Siswa;
};
