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
