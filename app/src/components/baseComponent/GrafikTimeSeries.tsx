import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { IGrafiks, ISiswaDetail } from 'src/utils/interface';

import { getGrafik as _getGrafik } from 'src/store/actions/resources';

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
import { Line, Bar } from 'react-chartjs-2';

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
      text: 'Chart.js Line Chart',
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
  console.log(_.map(grafik?.grafikTimeSeriesTotal, (grafik) => grafik.jumlah));

  const labelsTimeSeries = _.map(grafik?.grafikTimeSeriesTotal, (grafik) => {
    const bulan = moment(grafik.x).format('MMM');
    return bulan;
  });

  const dataTimeSeries = {
    labels: labelsTimeSeries,
    datasets: [
      {
        label: 'Jumlah Pelanggaran / Bulan',
        data: _.map(grafik?.grafikTimeSeriesTotal, (grafik) => grafik.y),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={dataTimeSeries} width={100} height={100} />;
};

type Props = { grafik: IGrafiks | undefined };
export default Grafik;
