export const USER_ROLE = {
  ADMIN: 'admin',
  GURU: 'guru',
  SISWA: 'siswa',
  ORANG_TUA: 'orang_tua',
} as const;

export const RESOURCE_NAME = {
  USERS: 'users',
  GURUS: 'gurus',
  SISWAS: 'siswas',
  ORANG_TUAS: 'orang-tuas',
  KATEGORI_PELANGGARANS: 'kategori-pelanggarans',
  PELANGGARANS: 'pelanggarans',
} as const;

export const ORDER = {
  DESC: 'desc',
  ASC: 'asc',
} as const;

export const SP_URL = 'sp/spGenerator';
