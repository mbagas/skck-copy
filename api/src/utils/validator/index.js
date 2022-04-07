const guruSchema = require('./guru');
const siswaSchema = require('./siswa');
const orangTuaSchema = require('./orangTua');

module.exports = [...guruSchema, ...siswaSchema, ...orangTuaSchema];
