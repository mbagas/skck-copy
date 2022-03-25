import _ from 'lodash';
import * as Yup from 'yup';
import { USER_ROLE } from './constant';

export const loginSchema = Yup.object({
  userName: Yup.string().required('Username Dibutuhkan'),
  password: Yup.string().required('Password Dibutuhkan'),
  role: Yup.mixed()
    .required('Role Dibutuhkan')
    .test('role', 'Role Tidak Valid', (role) => _.includes(USER_ROLE, role)),
});

export const guruSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama lengkap dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
  nipNrk: Yup.string().required('NIP/NRK dibutuhkan'),
  alamat: Yup.string(),
});

export const siswaSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama lengkap dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
  nis: Yup.string().required('NIS dibutuhkan'),
  nisn: Yup.string().required('NIS dibutuhkan'),
  alamat: Yup.string(),
});

export const orangTuaSchema = Yup.object({
  namaLengkap: Yup.string().required('Nama lengkap dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
  noTelp: Yup.string().required('No telp dibutuhkan'),
  alamat: Yup.string(),
});

export const adminSchema = Yup.object({
  Username: Yup.string().required('Username dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
});
