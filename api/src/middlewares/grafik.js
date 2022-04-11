const _ = require('lodash');
const asyncMw = require('async-express-mw');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const repository = require('../repository');

// Get all Pelanggaran data
exports.getParamTimeSeriesMw = asyncMw(async (req, res, next) => {
  const grafikTimeSeriesTotal = await sequelize.query(
    `
    SELECT  
    createdAt as x ,
    count(pelanggaranId) as y
    FROM Pelanggarans 
    GROUP BY MONTH(createdAt)
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const grafikBarPelanggaran = await sequelize.query(
    `
    SELECT KategoriPelanggarans.namaKategori, 
    count(Pelanggarans.pelanggaranId) as jumlah 
    FROM Pelanggarans 
    INNER JOIN KategoriPelanggarans ON Pelanggarans.pelanggaranId = KategoriPelanggarans.id 
    GROUP BY pelanggaranId
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const highestPelanggaran = await sequelize.query(
    `
  SELECT nama,MAX(jumlah) 
  FROM 
  (SELECT KategoriPelanggarans.namaKategori as nama, 
  COUNT(pelanggaranId) as jumlah 
  FROM Pelanggarans 
  INNER JOIN KategoriPelanggarans ON Pelanggarans.pelanggaranId = KategoriPelanggarans.id 
  GROUP BY pelanggaranId 
  ORDER BY jumlah DESC) as total;
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const totalSiswa = await sequelize.query('SELECT COUNT(id) as totalSiswa FROM Siswas', {
    type: QueryTypes.SELECT,
  });

  const totalPelanggaran = await sequelize.query('SELECT COUNT(id) as total FROM Pelanggarans', {
    type: QueryTypes.SELECT,
  });

  const jumlahPelanggaranToday = await sequelize.query(
    'SELECT count(id) as jumlah from Pelanggarans WHERE date(createdAt) LIKE CURRENT_DATE()',
    { type: QueryTypes.SELECT }
  );
  return res.json({
    grafikTimeSeriesTotal,
    grafikBarPelanggaran,
    highestPelanggaran,
    totalSiswa,
    totalPelanggaran,
    jumlahPelanggaranToday,
  });
});
