import React from 'react';
import Footer from 'src/components/Footer';
import { DefaultLayout } from 'src/components/pageLayout';
import TopBar from 'src/components/TopBar';
import { Flex, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <DefaultLayout>
      <TopBar />
      <Flex paddingX={3} paddingY={8} flex={1}>
        <Text color={'white'} fontFamily={'Poppins'}>
          Mohon maaf, sepertinya halaman yang anda cari tidak tersedia
        </Text>
      </Flex>
      <Footer />
    </DefaultLayout>
  );
};

export default NotFound;
