import React from 'react';
import _ from 'lodash';
import { IGrafiks } from 'src/utils/interface';
import moment from 'moment';
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
import { Line } from 'react-chartjs-2';

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

const options = {
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Jumlah Pelanggaran / Bulan',
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
  const labelsTimeSeries = _.map(_.get(grafik, 'grafikTimeSeriesTotal', []), (grafik) =>
    moment(grafik.x).format('MMM')
  );

  const dataTimeSeries = {
    labels: labelsTimeSeries,
    datasets: [
      {
        label: 'Bulan',
        data: _.map(_.get(grafik, 'grafikTimeSeriesTotal', []), (grafik) => grafik.y),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={dataTimeSeries} width={100} height={100} />;
};

type Props = { grafik?: IGrafiks };

export default Grafik;
