import { USER_ROLE } from './constant';

interface IUser {
  id: number;
  userName: string;
  role: typeof USER_ROLE[keyof typeof USER_ROLE] | '';
}

const newUser: IUser = {
  id: 1,
  userName: 'test',
  role: USER_ROLE.ORANG_TUA,
};

newUser.role = USER_ROLE.ADMIN;

export {};
