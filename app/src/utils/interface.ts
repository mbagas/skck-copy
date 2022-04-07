import { USER_ROLE } from './constant';

export type RoleType = typeof USER_ROLE[keyof typeof USER_ROLE];
export type RoleKey = keyof typeof USER_ROLE;

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
  nisn: string;
  nis: string;
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
  kategoriPelanggaran?: IKategoriPelanggaran;
}

export interface IOrangTua extends IBaseOrangTua {
  id: number;
  siswas: Omit<IBaseSiswa, 'pelanggarans' | 'orangTua' | 'totalPoint' | 'histories'>[];
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
  shortUrl: string;
  longUrl: string;
  totalPoint: number;
  createdAt: string;
}

export interface ISiswa extends IBaseSiswa {
  id: number;
  userId: number;
  orangTuaId: number;
  totalPoint: ITotalPoint;
}

export interface ISiswaDetail extends ISiswa {
  orangTua: Omit<IOrangTua, 'siswas'>;
  histories: IHistory[];
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

export type ICreateGuru = Omit<IBaseGuru, 'jabatan' | 'userId'> & Partial<IBaseUser>;
export type ICreateOrangTua = Omit<IBaseOrangTua, 'userId'> & Partial<IBaseUser>;
export type ICreateSiswa = Omit<IBaseSiswa, 'userId'> & Partial<IBaseUser>;

export interface ICreateUser {
  ADMIN: IBaseUser;
  GURU: ICreateGuru;
  SISWA: ICreateSiswa;
  ORANG_TUA: ICreateOrangTua;
}

export type CreateUserType =
  | IBaseUser
  | ICreateGuru
  | ICreateOrangTua
  | (ICreateSiswa & { orangTuaId: number });

export interface IGrafikTimeSeriesMultiParams {
  namaKategori: string;
  jumlah: number;
  bulan: number;
}

export interface IGrafikTimeSeriesTotal {
  y: number;
  x: string;
}

export interface IGrafikBarPelanggaran {
  namaKategori: string;
  jumlah: number;
}

export interface ITotalSiswa {
  totalSiswa: number;
}

export interface IHighestPelanggaran {
  nama: string;
}

export interface ITotalPelanggaran {
  total: number;
}

export interface IJumlahPelanggaranToday {
  jumlah: number;
}

export interface IChangePass {
  oldPassword: string;
  password: string;
  confirmationPassword: string;
}

export interface ISuratPeringatan {
  history: IHistory;
  siswa: ISiswa;
}

export interface IGrafiks {
  grafikTimeSeriesMultiParams: IGrafikTimeSeriesMultiParams[];
  grafikTimeSeriesTotal: IGrafikTimeSeriesTotal[];
  grafikBarPelanggaran: IGrafikBarPelanggaran[];
  highestPelanggaran: IHighestPelanggaran[];
  totalSiswa: ITotalSiswa[];
  totalPelanggaran: ITotalPelanggaran[];
  jumlahPelanggaranToday: IJumlahPelanggaranToday[];
}
