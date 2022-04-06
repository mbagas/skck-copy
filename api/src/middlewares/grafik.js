const _ = require('lodash');
const asyncMw = require('async-express-mw');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// Get all Pelanggaran data
exports.getParamTimeSeriesMw = asyncMw(async (req, res, next) => {
  const grafikTimeSeriesMultiParams = await sequelize.query(
    `
    select 
    kategoripelanggarans.namaKategori, 
    count(pelanggarans.pelanggaranId) as jumlah, 
    MONTH(pelanggarans.createdAt) as bulan 
    from pelanggarans 
    INNER JOIN kategoripelanggarans 
    ON pelanggarans.pelanggaranId = kategoripelanggarans.id 
    group by pelanggaranId, MONTH(createdAt)
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const grafikTimeSeriesTotal = await sequelize.query(
    `
    select  
    createdAt as x ,
    count(pelanggaranId) as y
    from pelanggarans 
    group by  MONTH(createdAt)
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  const grafikBarPelanggaran = await sequelize.query(
    `
    select kategoripelanggarans.namaKategori, 
    count(pelanggarans.pelanggaranId) as jumlah 
    from pelanggarans 
    INNER JOIN kategoripelanggarans ON pelanggarans.pelanggaranId = kategoripelanggarans.id 
    group by pelanggaranId
  `,
    {
      type: QueryTypes.SELECT,
    }
  );
  return res.json({ grafikTimeSeriesMultiParams, grafikTimeSeriesTotal, grafikBarPelanggaran });
});
