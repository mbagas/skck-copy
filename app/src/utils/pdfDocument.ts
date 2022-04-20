import { ISuratPeringatan } from './interface';

export const DEFAULT_DOCUMENT_PROPS = {
  author: 'SMAN 1 Bukittinggi',
  creator: 'SMAN 1 Bukittinggi',
  producer: 'PTI Knock',
  subject: 'Surat Peringatan',
};

export const generateSPDocumentProps = (suratPeringatan: ISuratPeringatan) => ({
  title: `Surat Peringatan ${suratPeringatan.history.spKe} - ${suratPeringatan.siswa.namaLengkap}`,
  ...DEFAULT_DOCUMENT_PROPS,
});

export const SP_TEXT = {
  1: 'Berhubung dengan total poin siswa telah mencapai syarat untuk dikeluarkannya Surat Peringatan 1, Sekolah memberitahukan kepada Orang Tua/Wali Siswa/i, bahwa siswa/i dengan diatas akan menjalani proses pembinaan oleh Guru Bimbingan Konseling dan Wali Kelas beserta dengan Bapak/Ibu Wali dari siswa/i tersebut. Diharapkan kehadiran Bapak/Ibu dalam sesi bimbingan tersebut.',
  2: 'Berhubung dengan total poin siswa telah mencapai syarat untuk dikeluarkannya Surat Peringatan 2, Sekolah memberitahukan kepada Orang Tua/Wali siswa/i, bahwa siswa/i dengan data di atas akan menjalani proses pembinaan oleh Wakil kepala sekolah beserta Bapak/Ibu Wali dari siswa/i tersebut. Diharapkan kehadiran Bapak/Ibu dalam sesi bimbingan tersebut.',
  3: 'Berhubung dengan total poin Siswa telah mencapai syarat untuk dikeluarkannya Surat Peringatan 3, Sekolah memberitahukan kepada Orang Tua/Wali siswa/i, bahwa siswa dengan data di atas akan ditindaklanjuti oleh Kepala sekolah bersama kedua orang tua dari siswa/i tersebut. Bapak/Ibu diharapkan untuk dapat hadir dalam proses pemulangan siswa/i kepada orang tua/wali.',
} as const;
