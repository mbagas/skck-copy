import React from 'react';
import { UserLayout } from 'src/components/pageLayout';
import { RiwayatContentSiswa } from 'src/components/userPage/Riwayat';

const RiwayatPage = () => {
  return (
    <UserLayout>
      <RiwayatContentSiswa />
    </UserLayout>
  );
};

export default RiwayatPage;
