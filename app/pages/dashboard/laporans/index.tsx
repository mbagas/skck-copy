import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import LaporanContent from 'src/components/dashboardPage/laporanPelanggaran/LaporanContent';

const laporans = () => {
  return (
    <AdminLayout>
      <LaporanContent />
    </AdminLayout>
  );
};

export default laporans;
