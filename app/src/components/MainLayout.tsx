import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Box
      bgImage={{ md: './bg.jpg' }}
      height="100vh"
      width="100vw"
      bg="royalGray.200"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex direction={'column'} height="100%" width="100%">
        {children}
      </Flex>
    </Box>
  );
};

export default MainLayout;
