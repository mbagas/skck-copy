import { USER_ROLE } from './constant';
import { RoleType } from './interface';

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
