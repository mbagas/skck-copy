import _ from 'lodash';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import csvDownload from 'json-to-csv-export';
import { IResourcesWithId } from './resourceInterface';

export const generateSiswaCSV = (siswas: IResourcesWithId['siswas']) => {
  console.log(siswas.rows);
  return csvDownload(
    _.toArray(
      _.map(siswas.rows, (siswa) => ({
        nama_lengkap: siswa.namaLengkap,
        nis: siswa.nis,
        nisn: siswa.nisn,
        total_point: _.get(siswa, 'totalPoint', 0),
      }))
    ),
    `${moment().format('YYYY-MM-DD')}.csv`
  );
};
