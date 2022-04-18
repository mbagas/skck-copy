const { USER_ROLE } = require('./constants');

const phoneNumber = ['085213085649', '081273312165', '08980864375'];
const alamat = [
  'Jl. Soekarno Hatta No.7, Manggis, Mandiangin Koto Selayan',
  'Jl. Syekh Jamil Jambek No. 5, Guguk Panjang',
  'Jl. Dr. Hamka, Guguk Panjang',
];
const nis = ['22628', '22629', '22635', '21639', '22640', '22645'];
const nisn = ['0086283451', '0086293325', '0086359084', '0076398769', '0086404521', '0086453908'];

exports.orangTua = {
  USER: [
    {
      userName: phoneNumber[0],
      password: phoneNumber[0],
      role: USER_ROLE.ORANG_TUA,
    },
    {
      userName: phoneNumber[1],
      password: phoneNumber[1],
      role: USER_ROLE.ORANG_TUA,
    },
    {
      userName: phoneNumber[2],
      password: phoneNumber[2],
      role: USER_ROLE.ORANG_TUA,
    },
  ],
  ROLE: [
    {
      namaLengkap: 'Fahri Setiawan',
      alamat: alamat[0],
      noTelp: phoneNumber[0],
    },
    {
      namaLengkap: 'Muksin Bagaskara',
      alamat: alamat[1],
      noTelp: phoneNumber[1],
    },
    {
      namaLengkap: 'Ilham Nofri Yandra',
      alamat: alamat[2],
      noTelp: phoneNumber[2],
    },
  ],
};

exports.siswa = {
  USER: [
    {
      userName: nis[0],
      password: nis[0],
      role: USER_ROLE.SISWA,
    },
    {
      userName: nis[1],
      password: nis[1],
      role: USER_ROLE.SISWA,
    },
    {
      userName: nis[2],
      password: nis[2],
      role: USER_ROLE.SISWA,
    },
    {
      userName: nis[3],
      password: nis[3],
      role: USER_ROLE.SISWA,
    },
    {
      userName: nis[4],
      password: nis[4],
      role: USER_ROLE.SISWA,
    },
    {
      userName: nis[5],
      password: nis[5],
      role: USER_ROLE.SISWA,
    },
  ],
  ROLE: [
    {
      namaLengkap: 'Abdurrachman Farras',
      nis: nis[0],
      nisn: nisn[0],
      alamat: alamat[0],
      noTelp: phoneNumber[0],
    },
    {
      namaLengkap: 'Gibran Basyayef',
      nis: nis[1],
      nisn: nisn[1],
      alamat: alamat[1],
      noTelp: phoneNumber[1],
    },
    {
      namaLengkap: 'Ridho Liwardana',
      nis: nis[2],
      nisn: nisn[2],
      alamat: alamat[1],
      noTelp: phoneNumber[1],
    },
    {
      namaLengkap: 'Muhammad Ammar Fadhila Ramadhan',
      nis: nis[3],
      nisn: nisn[3],
      alamat: alamat[2],
      noTelp: phoneNumber[2],
    },
    {
      namaLengkap: 'Fajar Tegar Nugraha',
      nis: nis[4],
      nisn: nisn[4],
      alamat: alamat[2],
      noTelp: phoneNumber[2],
    },
    {
      namaLengkap: 'Muhammad Ariefuddin Satria Dharma',
      nis: nis[5],
      nisn: nisn[5],
      alamat: alamat[2],
      noTelp: phoneNumber[2],
    },
  ],
};

exports.guru = {
  USER: [
    {
      userName: '190400957001',
      password: '190400957001',
      role: USER_ROLE.GURU,
    },
  ],
  ROLE: [
    {
      nipNrk: '190400957001',
      namaLengkap: 'Jamaludin, S. Pd.',
      alamat: alamat[2],
    },
  ],
};

exports.kategoriPelanggaran = [
  {
    namaKategori: 'Merokok',
    poin: 7,
  },
  {
    namaKategori: 'Melompati Pagar',
    poin: 5,
  },
  {
    namaKategori: 'Berkelahi',
    poin: 6,
  },
  {
    namaKategori: 'Melawan Guru',
    poin: 10,
  },
  {
    namaKategori: 'Merusak Sarana/Prasarana',
    poin: 8,
  },
  {
    namaKategori: 'Terlambat',
    poin: 3,
  },
  {
    namaKategori: 'Atribut Tidak Lengkap',
    poin: 2,
  },
  {
    namaKategori: 'Berambut Panjang',
    poin: 3,
  },
  {
    namaKategori: 'Membuang Sampah Sembarangan',
    poin: 4,
  },
  {
    namaKategori: 'Merusak Tanaman',
    poin: 4,
  },
];
