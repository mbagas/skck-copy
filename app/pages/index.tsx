import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getRole, isAuthenticated } from 'src/utils/sessionUtils';
import { UserLayout } from 'src/components/pageLayout';
import { USER_ROLE } from 'src/utils/constant';

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const getPageToShow = () => {
    const role = getRole();

    switch (role) {
      case USER_ROLE.ADMIN:
        return Router.push('/dashboard');
      default:
        return <UserLayout />;
    }
  };

  useEffect(() => {
    const isLogin = isAuthenticated();
    setIsLogin(isLogin);

    if (!isLogin) Router.push('/login');
  }, []);

  return isLogin ? getPageToShow() : null;
};

export default Home;
