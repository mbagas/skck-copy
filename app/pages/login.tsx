import React from 'react';
import TopBar from 'src/components/TopBar';
import Footer from 'src/components/Footer';
import LoginContent from 'src/components/LoginContent';
import MainLayout from 'src/components/MainLayout';

const Login = () => {
  return (
    <MainLayout>
      <TopBar />
      <LoginContent />
      <Footer />
    </MainLayout>
  );
};

export default Login;
