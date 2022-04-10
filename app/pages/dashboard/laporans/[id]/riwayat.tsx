import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import { RiwayatContentGuru } from 'src/components/userPage/Riwayat';

const RiwayatPage = () => {
  return (
    <AdminLayout>
      <RiwayatContentGuru />
    </AdminLayout>
  );
};

export default RiwayatPage;
