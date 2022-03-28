import React from 'react';
import useIdQuery from 'src/utils/useIdQuery';
import { AdminLayout } from 'src/components/pageLayout';

const LaporanDetail = () => {
  const queryId = useIdQuery();

  return <AdminLayout>LaporanDetail</AdminLayout>;
};

export default LaporanDetail;
