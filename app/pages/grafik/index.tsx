import React from 'react';
import GrafikContent from 'src/components/userPage/GrafikContent';
import { UserLayout } from 'src/components/pageLayout';

const Dashboard = () => {
  return (
    <UserLayout>
      <GrafikContent />
    </UserLayout>
  );
};

export default Dashboard;
