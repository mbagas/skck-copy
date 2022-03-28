import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import KategoriContent from 'src/components/dashboardPage/kategoriPelanggaran/KategoriContent';

const KategoriPelanggarans = () => {
  return (
    <AdminLayout>
      <KategoriContent />
    </AdminLayout>
  );
};

export default KategoriPelanggarans;
