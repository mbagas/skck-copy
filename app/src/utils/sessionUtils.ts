import jwtDecode, { JwtPayload } from 'jwt-decode';
import _ from 'lodash';
import { RoleType } from './interface';

interface IJWT extends JwtPayload {
  id: number;
  accountId: number;
  role: RoleType;
}

export const setToken = (token: string) => localStorage.setItem('access_token', token);

export const getToken = () => localStorage.getItem('access_token');

export const getRole = () => {
  const token = getToken();

  if (_.isNil(token)) return;

  const { role } = jwtDecode<IJWT>(token);

  return role;
};

const SessionUtils = {
  getToken,
  setToken,
  getRole,
};

export default SessionUtils;
