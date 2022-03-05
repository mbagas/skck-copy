import React from 'react';
import TopBar from 'src/components/TopBar';
import Footer from 'src/components/Footer';
import LoginContent from 'src/components/LoginContent';
import MainLayout from 'src/components/MainLayout';
import { Flex } from '@chakra-ui/react';

const Login = () => {
  return (
    <MainLayout>
      <TopBar />
      <Flex flex={1}>
        <LoginContent />
      </Flex>
      <Footer />
    </MainLayout>
  );
};

export default Login;
