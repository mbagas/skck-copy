import jwtDecode, { JwtPayload } from 'jwt-decode';
import _ from 'lodash';
import { USER_ROLE } from './constant';
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

  return role === USER_ROLE.ADMIN || role === USER_ROLE.GURU;
};

export const getAccountId = (): number | undefined => {
  const token = getToken();

  if (_.isNil(token)) return;

  const { accountId } = jwtDecode<IJWT>(token);

  return accountId;
};

const SessionUtils = {
  getToken,
  setToken,
  getRole,
  getAccountId,
};

export default SessionUtils;
