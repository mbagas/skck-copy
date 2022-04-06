import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Flex, Text } from '@chakra-ui/react';
import { IGrafiks, ISiswaDetail } from 'src/utils/interface';
import { getGrafik as _getGrafik } from 'src/store/actions/resources';

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
  const labelsBar = _.map(grafik?.grafikBarPelanggaran, (grafik) => {
    const namaKategori = grafik.namaKategori;
    return namaKategori;
  });

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Jumlah Pelanggaran / Kategori',
        data: _.map(grafik?.grafikBarPelanggaran, (grafik) => grafik.jumlah),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={dataBar} width={100} height={100} />;
};

type Props = { grafik: IGrafiks | undefined };
export default Grafik;
