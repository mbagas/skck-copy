import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getRole, isAuthenticated } from 'src/utils/sessionUtils';
import UserContent from 'src/components/userPage/UserContent';
import { USER_ROLE } from 'src/utils/constant';

const Home = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const getPageToShow = () => {
    const role = getRole();

    switch (role) {
      case USER_ROLE.ADMIN:
        return router.push('/dashboard');
      default:
        return <UserContent />;
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const isLogin = isAuthenticated();
    setIsLogin(isLogin);

    if (!isLogin) router.push('/login');
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return isLogin ? getPageToShow() : null;
};

export default Home;
