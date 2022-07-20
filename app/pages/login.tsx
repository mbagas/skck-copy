import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigationBar from 'src/components/navigationBar';
import { DefaultLayout } from 'src/components/pageLayout';
import LoginContent from 'src/components/loginPage/LoginContent';
import { getRole, isAuthenticated } from 'src/utils/sessionUtils';
import { USER_ROLE } from 'src/utils/constant';

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const isLogin = isAuthenticated();
    setIsLogin(isLogin);

    if (!isLogin) return;

    const role = getRole();

    switch (role) {
      case USER_ROLE.ADMIN:
        router.push('/dashboard');
        break;
      default:
        router.push('/');
        break;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return !isLogin ? (
    <DefaultLayout>
      <NavigationBar.DefaultTopBar />
      <LoginContent />
    </DefaultLayout>
  ) : null;
};

export default Login;
