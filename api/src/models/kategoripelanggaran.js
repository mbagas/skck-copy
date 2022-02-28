'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KategoriPelanggaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KategoriPelanggaran.init({
    namaKategori: DataTypes.STRING,
    poin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KategoriPelanggarans',
  });
  return KategoriPelanggaran;
};