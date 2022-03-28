import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import CreateAdminContent from 'src/components/dashboardPage/akunPage/admin/CreateAdminContent';

const CreateAdmin = () => {
  return (
    <AdminLayout>
      <CreateAdminContent />
    </AdminLayout>
  );
};

export default CreateAdmin;
