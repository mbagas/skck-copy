const _ = require('lodash');
const asyncMw = require('async-express-mw');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const repository = require('../repository');

// Get all Pelanggaran data
exports.getParamTimeSeriesMw = asyncMw(async (req, res, next) => {
  const grafikTimeSeriesMultiParams = await sequelize.query(
    `
    SELECT 
    kategoripelanggarans.namaKategori, 
    count(pelanggarans.pelanggaranId) as jumlah, 
    MONTH(pelanggarans.createdAt) as bulan 
    FROM pelanggarans 
    INNER JOIN kategoripelanggarans 
    ON pelanggarans.pelanggaranId = kategoripelanggarans.id 
    GROUP BY pelanggaranId, MONTH(createdAt)
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const grafikTimeSeriesTotal = await sequelize.query(
    `
    SELECT  
    createdAt as x ,
    count(pelanggaranId) as y
    FROM pelanggarans 
    GROUP BY MONTH(createdAt)
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const grafikBarPelanggaran = await sequelize.query(
    `
    SELECT kategoripelanggarans.namaKategori, 
    count(pelanggarans.pelanggaranId) as jumlah 
    FROM pelanggarans 
    INNER JOIN kategoripelanggarans ON pelanggarans.pelanggaranId = kategoripelanggarans.id 
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
  (SELECT kategoripelanggarans.namaKategori as nama, 
  COUNT(pelanggaranId) as jumlah 
  FROM pelanggarans 
  INNER JOIN kategoripelanggarans ON pelanggarans.pelanggaranId = kategoripelanggarans.id 
  GROUP BY pelanggaranId 
  ORDER BY jumlah DESC) as total;
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const totalSiswa = await sequelize.query('SELECT COUNT(id) as totalSiswa FROM siswas', {
    type: QueryTypes.SELECT,
  });

  const totalPelanggaran = await sequelize.query('SELECT COUNT(id) as total FROM pelanggarans', {
    type: QueryTypes.SELECT,
  });

  const jumlahPelanggaranToday = await sequelize.query(
    'SELECT count(id) as jumlah from pelanggarans WHERE date(createdAt) LIKE CURRENT_DATE()',
    { type: QueryTypes.SELECT }
  );
  return res.json({
    grafikTimeSeriesMultiParams,
    grafikTimeSeriesTotal,
    grafikBarPelanggaran,
    highestPelanggaran,
    totalSiswa,
    totalPelanggaran,
    jumlahPelanggaranToday,
  });
});
