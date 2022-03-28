import { USER_ROLE } from './constant';
import { RoleType, CreateUserType, ICreateUser } from './interface';

export const generateLoginUrl = (value: string) => {
  switch (value) {
    case USER_ROLE.ADMIN:
      return 'users';
    case USER_ROLE.GURU:
      return 'gurus';
    case USER_ROLE.ORANG_TUA:
      return 'orang-tuas';
    default:
      return 'siswas';
  }
};

export const getLoginResultUrl = (role: RoleType) => {
  switch (role) {
    case USER_ROLE.ADMIN:
      return 'dashboard';
    default:
      return '/';
  }
};

export const generateUserName = (payload: CreateUserType) => {
  switch (payload.role) {
    case USER_ROLE.GURU:
      payload.userName = (payload as ICreateUser['GURU']).nipNrk;
      break;
    case USER_ROLE.ORANG_TUA:
      payload.userName = (payload as ICreateUser['ORANG_TUA']).noTelp;
      break;
    case USER_ROLE.SISWA:
      payload.userName = `${(payload as ICreateUser['SISWA']).nis}`;
    default:
      break;
  }

  return payload;
};

export const getUserFilter = (search: string) => {
  const filters = `filters=userName CONTAINS "${search}"`;

  return filters;
};

export const getSiswaFilter = (search: string) => {
  const filters = `filters=nis CONTAINS "${search}" OR nisn CONTAINS "${search}" OR namaLengkap CONTAINS "${search}"`;

  return filters;
};

export const getGuruFilter = (search: string) => {
  const filters = `filters=nipNrk CONTAINS "${search}" OR namaLengkap CONTAINS "${search}"`;

  return filters;
};

export const getOrangTuaFilter = (search: string) => {
  const filters = `filters=noTelp CONTAINS "${search}" OR namaLengkap CONTAINS "${search}"`;

  return filters;
};
