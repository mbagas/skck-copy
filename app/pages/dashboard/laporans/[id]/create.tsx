import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import LaporanSiswaCreate from 'src/components/dashboardPage/laporanPelanggaran/LaporanSiswaCreate';

const LaporanDetail = () => {
  return (
    <AdminLayout>
      <LaporanSiswaCreate />
    </AdminLayout>
  );
};

export default LaporanDetail;
