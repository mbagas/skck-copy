import React from 'react';
import { Flex, VStack, Divider, Image, Text, AspectRatio } from '@chakra-ui/react';

const LoginHeader: React.FC = () => {
  const aliceText = {
    color: 'white',
    fontFamily: 'Alice',
    fontSize: {
      base: '1rem',
      lg: '1.2rem',
    },
  };

  const poppinsText = (isYellow = true) => ({
    ...{ color: isYellow ? 'textLogin.SMA' : 'white' },
    fontFamily: 'Poppins',
    fontSize: {
      base: '0.85rem',
      lg: '1.1rem',
    },
  });

  return (
    <Flex width={'100%'} flexDirection={'column'} display={{ base: 'flex', md: 'none' }} mb={3}>
      <Flex bg="whiteAlpha.300" borderRadius={30} alignItems="center" mb={2} p={3} mx={5}>
        <Flex align="center" mr={5}>
          <AspectRatio ratio={1} width={{ base: 70, lg: 75 }}>
            <Image
              borderRadius="full"
              src="logo1.png"
              alt="Logo"
              width={{ base: 70, lg: 75 }}
              height={{ base: 70, lg: 75 }}
            />
          </AspectRatio>
        </Flex>
        <VStack spacing={0} alignItems="left">
          <Text {...poppinsText(false)}>SISTEM INFORMASI PENCATATAN PELANGGARAN</Text>
          <Text {...aliceText}>SMAN 1 BUKITTINGGI</Text>
          <Text {...poppinsText()}>SMAN 1 UNGGUL BUKITTINGGI</Text>
        </VStack>
      </Flex>
      <Flex justifyContent={'center'}>
        <Divider
          opacity={'25%'}
          justifyContent={'center'}
          display={{ base: 'flex', md: 'none' }}
          width="80%"
        />
      </Flex>
    </Flex>
  );
};

export default LoginHeader;
