import React from 'react';
import styles from '../../styles/Home.module.css';
import { Text } from '@chakra-ui/react';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Text>
        Copyright © 2022{' '}
        <a href="https://github.com/mbagas/skck-copy" target="_blank" rel="noreferrer">
          PTI Knock
        </a>
      </Text>
    </footer>
  );
};

export default Footer;
