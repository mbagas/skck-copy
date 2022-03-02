const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pelanggaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pelanggaran.belongsTo(models.Siswas, {
        foreignKey: 'siswaId',
        onDelete: 'CASCADE',
        as: 'siswa',
      });

      Pelanggaran.belongsTo(models.KategoriPelanggarans, {
        foreignKey: 'pelanggaranId',
        onDelete: 'CASCADE',
        as: 'kategoriPelanggaran',
      });
    }
  }
  Pelanggaran.init(
    {
      pelanggaranId: DataTypes.INTEGER,
      siswaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Pelanggarans',
    }
  );
  return Pelanggaran;
};
