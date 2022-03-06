import React from 'react';
import TopBar from 'src/components/TopBar';
import { DefaultLayout } from 'src/components/pageLayout';
import LoginContent from 'src/components/loginPage/LoginContent';

const Login = () => {
  return (
    <DefaultLayout>
      <TopBar />
      <LoginContent />
    </DefaultLayout>
  );
};

export default Login;
