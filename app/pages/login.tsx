import React from 'react';
import NavigationBar from 'src/components/navigationBar';
import { DefaultLayout } from 'src/components/pageLayout';
import LoginContent from 'src/components/loginPage/LoginContent';

const Login = () => {
  return (
    <DefaultLayout>
      <NavigationBar.DefaultTopBar />
      <LoginContent />
    </DefaultLayout>
  );
};

export default Login;
