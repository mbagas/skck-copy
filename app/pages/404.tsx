import React from 'react';
import { DefaultLayout } from 'src/components/pageLayout';
import { DefaultTopBar } from 'src/components/navigationBar';
import { Flex, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <DefaultLayout>
      <DefaultTopBar />
      <Flex paddingX={3} paddingY={8} flex={1}>
        <Text color={'white'} fontFamily={'Poppins'}>
          Mohon maaf, sepertinya halaman yang anda cari tidak tersedia
        </Text>
      </Flex>
    </DefaultLayout>
  );
};

export default NotFound;
