import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import CreateSiswaContent from 'src/components/dashboardPage/akunPage/siswa/CreateSiswaContent';

const CreateSiswa = () => {
  return (
    <AdminLayout>
      <CreateSiswaContent />
    </AdminLayout>
  );
};

export default CreateSiswa;
