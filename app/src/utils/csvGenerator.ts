import _ from 'lodash';
import moment from 'moment';
import csvDownload from 'json-to-csv-export';
import { IResourcesWithId } from './resourceInterface';

export const generateSiswaCSV = (siswas: IResourcesWithId['siswas']) =>
  csvDownload(
    _.values(
      _.map(siswas.rows, (siswa) => ({
        nama_lengkap: siswa.namaLengkap,
        nis: siswa.nis,
        nisn: siswa.nisn,
        total_point: _.get(siswa, 'totalPoint', 0),
      }))
    ),
    `${moment().format('YYYY-MM-DD')}.csv`
  );
