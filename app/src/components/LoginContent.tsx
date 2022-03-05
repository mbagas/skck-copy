import React from 'react';
import styles from '../../styles/Home.module.css';
import { Box, Stack, Flex, Text, Image, Spacer } from '@chakra-ui/react';

const LoginContent = () => {
  return (
    <Flex>
      <Box p="4" bg="red.400">
        Selamat Datang Di Website Pelaporan SMA 1 Bukit Tinggi
      </Box>
      <Spacer />
      <Box p="4" bg="green.400">
        Box 2
      </Box>
    </Flex>
  );
};

export default LoginContent;
