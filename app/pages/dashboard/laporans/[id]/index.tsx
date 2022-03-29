import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import LaporanSiswaContent from 'src/components/dashboardPage/laporanPelanggaran/LaporanSiswaContent';

const LaporanDetail = () => {
  return (
    <AdminLayout>
      <LaporanSiswaContent />
    </AdminLayout>
  );
};

export default LaporanDetail;