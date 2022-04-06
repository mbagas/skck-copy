const cors = require('cors');
const express = require('express');
const { queryParserMw } = require('../middlewares/parser');
const users = require('../routes/users');
const gurus = require('../routes/gurus');
const siswas = require('../routes/siswas');
const orangTuas = require('../routes/orangTua');
const kategoriPelanggarans = require('../routes/kategoriPelanggaran');
const pelanggarans = require('../routes/pelanggarans');
const suratPeringatan = require('../routes/suratPeringatan');
const grafiks = require('../routes/grafik');

/**
 * Use all the routes and middleware from the api folder
 * @param {express.Express} app
 */
module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('*', queryParserMw);
  app.use('/users', users);
  app.use('/gurus', gurus);
  app.use('/siswas', siswas);
  app.use('/orang-tuas', orangTuas);
  app.use('/kategori-pelanggarans', kategoriPelanggarans);
  app.use('/pelanggarans', pelanggarans);
  app.use('/sp', suratPeringatan);
  app.use('/grafiks', grafiks);
};
