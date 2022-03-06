import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import FormLogin from './FormLogin';
import LoginHeader from './LoginHeader';

const LoginContent: React.FC = () => {
  const poppinsText = (isYellow = true) => ({
    ...(isYellow ? { color: 'textLogin.SMA' } : {}),
    fontFamily: 'Poppins',
    fontSize: {
      base: '2rem',
      lg: '3.25rem',
    },
  });

  return (
    <Flex
      px={3}
      justifyContent={'center'}
      width={'100%'}
      height={{ base: '100%', md: '70%' }}
      alignItems={'center'}
    >
      <Flex
        justifyContent={{ base: 'center', md: 'space-between' }}
        mx={{ base: '0', md: '8' }}
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Flex ml={3} display={{ base: 'none', md: 'flex' }} textAlign={'center'}>
          <Text color={'white'} {...poppinsText(false)}>
            Selamat datang di website <br /> pelaporan pelanggaran!
          </Text>
        </Flex>
        <Flex flexDirection={'column'}>
          <LoginHeader />
          <FormLogin />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginContent;
