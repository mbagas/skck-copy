import React from 'react';
import { Box, Stack, Flex, Text } from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import { Image } from '@chakra-ui/react';

const Header: React.FC = ({ children }) => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} color="white">
      <Flex align="center" mr={5}>
        <Box>
          <Image
            borderRadius="full"
            boxSize="150px"
            src="/logo1.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Box>
      </Flex>

      <Stack
        display={{ block: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="left"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <div></div>
        <Text className={styles.poppins_text}>SISTEM INFORMASI PENCATATAN PELANGGARAN </Text>
        <Text className={styles.alice_text}>SMAN 1 BUKITTINGGI</Text>
        <Text className={styles.poppins_text} color={'TextLogin.SMA'}>
          SMAN 1 UNGGUL BUKITTINGGI
        </Text>
      </Stack>
    </Flex>
  );
};

export default Header;
