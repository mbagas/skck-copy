import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import SiswaContent from 'src/components/dashboardPage/akunPage/siswa/SiswaContent';

const Siswas = () => {
  return (
    <AdminLayout>
      <SiswaContent />
    </AdminLayout>
  );
};

export default Siswas;
