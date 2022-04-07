import React from 'react';
import { UserLayout } from 'src/components/pageLayout';
import { SiswaDetailGuru } from 'src/components/userPage/SiswaDetail';

const DetailSiswa = () => {
  return (
    <UserLayout>
      <SiswaDetailGuru />
    </UserLayout>
  );
};

export default DetailSiswa;
