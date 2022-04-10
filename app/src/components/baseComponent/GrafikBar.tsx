import React from 'react';
import _ from 'lodash';
import { IGrafiks } from 'src/utils/interface';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Jumlah Pelanggaran / Kategori',
    },
  },
  options: {
    layout: {
      padding: 500,
      height: 500,
    },
  },
};

const Grafik: React.FC<Props> = ({ grafik }) => {
  const labelsBar = _.map(
    _.get(grafik, 'grafikBarPelanggaran', []),
    (grafik) => grafik.namaKategori
  );

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Kategori',
        data: _.map(_.get(grafik, 'grafikBarPelanggaran', []), (grafik) => grafik.jumlah),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={dataBar} width={100} height={100} />;
};

type Props = { grafik: IGrafiks | undefined };
export default Grafik;
