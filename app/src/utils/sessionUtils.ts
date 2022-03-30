import jwtDecode, { JwtPayload } from 'jwt-decode';
import _ from 'lodash';
import { RoleType } from './interface';

interface IJWT extends Omit<JwtPayload, 'exp'> {
  id: number;
  accountId: number;
  role: RoleType;
  exp: number;
}

export const setToken = (token: string) => localStorage.setItem('access_token', token);

export const getToken = (): string | null => localStorage.getItem('access_token');

export const getRole = (): RoleType | undefined => {
  const token = getToken();

  if (_.isNil(token)) return;

  const { role } = jwtDecode<IJWT>(token);

  return role;
};

export const isExpired = (): boolean => {
  const token = getToken();

  if (_.isNil(token)) return true;

  const { exp } = jwtDecode<IJWT>(token);

  return exp * 1000 < Date.now();
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');

  return !token && !isExpired();
};

export const canDelete = (): boolean => {
  const role = getRole();

  return role === 'admin' || role === 'guru';
};

const SessionUtils = {
  getToken,
  setToken,
  getRole,
};

export default SessionUtils;
