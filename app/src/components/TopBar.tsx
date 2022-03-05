import React from 'react';
import { Box, Stack, Flex, Text, Image, Spacer } from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';

const TopBar: React.FC<Props> = ({ children, isLogin }) => {
  return (
    <Flex
      align="center"
      wrap="wrap"
      padding={4}
      color="white"
      bg={`${isLogin ? 'royalBlack.100' : 'transparent'}`}
    >
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
        <Text className={styles.poppins_text}>SISTEM INFORMASI PENCATATAN PELANGGARAN </Text>
        <Text className={styles.alice_text}>SMAN 1 BUKITTINGGI</Text>
        <Text className={styles.poppins_text} color={'textLogin.SMA'}>
          SMAN 1 UNGGUL BUKITTINGGI
        </Text>
      </Stack>
      <Spacer />
      <Flex>{children}</Flex>
    </Flex>
  );
};
type Props = { isLogin?: boolean };

export default TopBar;
