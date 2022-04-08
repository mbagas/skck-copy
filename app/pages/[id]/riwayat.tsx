import React from 'react';
import { UserLayout } from 'src/components/pageLayout';
import { RiwayatContentGuru } from 'src/components/userPage/Riwayat';

const RiwayatPage = () => {
  return (
    <UserLayout>
      <RiwayatContentGuru />
    </UserLayout>
  );
};

export default RiwayatPage;
