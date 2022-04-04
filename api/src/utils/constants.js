const { Histories, KategoriPelanggarans, OrangTuas, Siswas, TotalPoints } = require('../models');

exports.USER_ROLE = {
  ADMIN: 'admin',
  GURU: 'guru',
  SISWA: 'siswa',
  ORANG_TUA: 'orang_tua',
};

exports.SP_LIMIT = {
  SP1: 60,
  SP2: 80,
  SP3: 100,
};

exports.SP_NAME = {
  SP1: 1,
  SP2: 2,
  SP3: 3,
};

exports.INCLUDE_TOTAL_POINT = {
  model: TotalPoints,
  as: 'totalPoint',
  distinct: true,
};

exports.INCLUDE_HISTORY = {
  model: Histories,
  as: 'histories',
  distinct: true,
};

exports.INCLUDE_ORANG_TUA = {
  model: OrangTuas,
  as: 'orangTua',
  distinct: true,
};

exports.INCLUDE_SISWA = {
  model: Siswas,
  as: 'siswas',
};

exports.INCLUDE_HISTORY_SISWA = (spKe) => ({
  model: Histories,
  as: 'histories',
  distinct: true,
  where: {
    spKe,
  },
});

exports.INCLUDE_KATEGORI = {
  model: KategoriPelanggarans,
  as: 'kategoriPelanggaran',
  distinct: true,
};
