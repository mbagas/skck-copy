const Yup = require('yup');
const { USER_ROLE } = require('../constants');

const guruSchema = Yup.object({
  nipNrk: Yup.string().required('NIP/NRK dibutuhkan!'),
  namaLengkap: Yup.string().required('Nama Lengkap dibutuhkan!'),
  alamat: Yup.string(),
});

const orangTuaSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama Lengkap dibutuhkan!'),
  noTelp: Yup.string().required('Nomor telepon dibutuhkan!'),
  alamat: Yup.string(),
});

const siswaSchema = Yup.object({
  nis: Yup.string().required('NIS dibutuhkan!'),
  nisn: Yup.string().required('NISN dibutuhkan!'),
  namaLengkap: Yup.string().required('Nama Lengkap dibutuhkan!'),
  telpOrangTua: Yup.string(),
  alamat: Yup.string(),
});

const adminSchema = Yup.object({
  userName: Yup.string().required('Username dibutuhkan!'),
  password: Yup.string().required('Password dibutuhkan!'),
});

module.exports = {
  [USER_ROLE.ADMIN]: adminSchema,
  [USER_ROLE.SISWA]: siswaSchema,
  [USER_ROLE.GURU]: guruSchema,
  [USER_ROLE.ORANG_TUA]: orangTuaSchema,
};
