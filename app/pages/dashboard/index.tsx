import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import DashboardContent from 'src/components/dashboardPage/DashboardContent';

const Dashboard = () => {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
};

export default Dashboard;
