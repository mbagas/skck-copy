import { USER_ROLE } from './constant';

export type RoleType = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface IBasePelanggaran {
  pelanggaranId: number;
  siswaId: number;
}

export interface IBaseKategoriPelanggaran {
  namaKategori: string;
  poin: number;
}

export interface IBaseUser {
  userName: string;
  password: string;
  role: RoleType;
}

export interface IBaseGuru {
  nipNrk: string;
  namaLengkap: string;
  jabatan: string;
  alamat: string;
  userId: number;
}

export interface IBaseOrangTua {
  namaLengkap: string;
  alamat: string;
  noTelp: string;
  userId: number;
}

export interface IBaseSiswa {
  nisn: number;
  nis: number;
  namaLengkap: string;
  alamat: string;
}

export interface IKategoriPelanggaran extends IBaseKategoriPelanggaran {
  id: number;
}

export interface IPelanggaran extends IBasePelanggaran {
  id: number;
  createdAt: string;
}

export interface ISiswaPelanggaran extends IPelanggaran {
  kategoriPelanggaran: IKategoriPelanggaran;
}

export interface IOrangTua extends IBaseOrangTua {
  id: number;
  siswas: Omit<IBaseSiswa, 'pelanggarans' | 'orangTua' | 'totalPoint' | 'history'>[];
}

export interface ITotalPoint {
  id: number;
  totalPoint: number;
  siswaId: number;
}

export interface IHistory {
  id: number;
  spKe: number;
  siswaId: number;
  createdAt: string;
}

export interface ISiswa extends IBaseSiswa {
  id: number;
  userId: number;
  orangTuaId: number;
  totalPoint: ITotalPoint;
}

export interface ISiswaDetail extends ISiswa {
  pelanggarans: ISiswaPelanggaran[];
  orangTua: Omit<IOrangTua, 'siswas'>;
  history: IHistory[];
}

export interface IGuru extends IBaseGuru {
  id: number;
  userId: number;
}

export interface IUser extends IBaseUser {
  id: number;
}

export interface IAction<T> {
  type: string;
  data: T;
}

export interface ILoginPayload extends Omit<IBaseUser, 'role'> {
  role: RoleType | '';
}
