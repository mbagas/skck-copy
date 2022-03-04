import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from 'src/components/Header';
import styles from '../styles/Home.module.css';
import Footer from 'src/components/Footer';
import MainLayout from 'src/components/MainLayout';

const login = () => {
  return (
    <Box className={styles.bg_all}>
      <Header />
      <Footer />
    </Box>
  );
};

export default login;
