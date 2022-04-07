import _ from 'lodash';
import * as Yup from 'yup';
import { USER_ROLE } from './constant';

export const passwordSchema = Yup.object({
  password: Yup.string().required('Password dibutuhkan'),
});

export const loginSchema = Yup.object({
  userName: Yup.string().required('Username Dibutuhkan'),
  role: Yup.mixed()
    .required('Role Dibutuhkan')
    .test('role', 'Role Tidak Valid', (role) => _.includes(USER_ROLE, role)),
}).concat(passwordSchema);

export const guruSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama lengkap dibutuhkan'),
  nipNrk: Yup.string().required('NIP/NRK dibutuhkan'),
  alamat: Yup.string(),
});

export const createGuruSchema = guruSchema.concat(passwordSchema);

export const siswaSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama lengkap dibutuhkan'),
  nis: Yup.string().required('NIS dibutuhkan'),
  nisn: Yup.string().required('NIS dibutuhkan'),
  alamat: Yup.string(),
});

export const createSiswaSchema = guruSchema.concat(passwordSchema);

export const orangTuaSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama lengkap dibutuhkan'),
  noTelp: Yup.string().required('No telp dibutuhkan'),
  alamat: Yup.string(),
});

export const createOrangTuaSchema = orangTuaSchema.concat(passwordSchema);

export const adminSchema = Yup.object({
  userName: Yup.string().required('Username dibutuhkan'),
});

export const createAdminSchema = adminSchema.concat(passwordSchema);

export const kategoriSchema = Yup.object({
  namaKategori: Yup.string().required('Nama Kategori Dibutuhkan'),
  poin: Yup.number().required('Poin Dibutuhkan').min(1, 'Poin harus lebih dari 0'),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Password lama dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
  confirmationPassword: Yup.string()
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().required('Konfirmasi password dibutuhkan'),
    })
    .oneOf([Yup.ref('password'), null], 'Konfirmasi dan Password tidak sama'),
});
