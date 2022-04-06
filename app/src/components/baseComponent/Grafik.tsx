import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import useIdQuery from 'src/utils/useIdQuery';
import { IGrafiks, ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import { getGrafik as _getGrafik } from 'src/store/actions/resources';
import { resources } from 'src/store/selectors';
import { type } from 'os';
import moment from 'moment';
import {}

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
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      p={{ base: 2, md: 10 }}
      width={'100%'}
      height={'100%'}
    >
      <Flex width={'100%'} height={'100%'}>
        <Line options={options} data={dataTimeSeries} width={100} height={100} />
      </Flex>
      <Flex width={'100%'} height={'100%'}>
        <Bar options={options} data={dataBar} width={100} height={100} />
      </Flex>
    </Flex>
  );
};

type Props = { grafik: IGrafiks | undefined };
export default Grafik;
