import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import NavigationBar from 'src/components/navigationBar';
import { DefaultLayout } from 'src/components/pageLayout';
import LoginContent from 'src/components/loginPage/LoginContent';
import { getRole, isAuthenticated } from 'src/utils/sessionUtils';
import { USER_ROLE } from 'src/utils/constant';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isLogin = isAuthenticated();
    setIsLogin(isLogin);

    if (!isLogin) return;

    const role = getRole();

    switch (role) {
      case USER_ROLE.ADMIN:
        Router.push('/dashboard');
        break;
      default:
        Router.push('/');
        break;
    }
  }, []);

  return !isLogin ? (
    <DefaultLayout>
      <NavigationBar.DefaultTopBar />
      <LoginContent />
    </DefaultLayout>
  ) : null;
};

export default Login;
