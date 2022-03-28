import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import CreateKategoriContent from 'src/components/dashboardPage/kategoriPelanggaran/CreateKategoriContent';

const CreateKategoriPelanggaran = () => {
  return (
    <AdminLayout>
      <CreateKategoriContent />
    </AdminLayout>
  );
};

export default CreateKategoriPelanggaran;
