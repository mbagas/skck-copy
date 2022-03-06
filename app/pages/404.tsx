import React from 'react';
import Footer from 'src/components/Footer';
import MainLayout from 'src/components/MainLayout';
import TopBar from 'src/components/TopBar';
import { Flex, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <MainLayout>
      <TopBar />
      <Flex paddingX={3} paddingY={8} flex={1}>
        <Text color={'white'} fontFamily={'Poppins'}>
          Mohon maaf, sepertinya halaman yang anda cari tidak tersedia
        </Text>
      </Flex>
      <Footer />
    </MainLayout>
  );
};

export default NotFound;
