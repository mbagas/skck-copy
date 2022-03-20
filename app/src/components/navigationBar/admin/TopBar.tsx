import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Flex } from '@chakra-ui/react';
import { BaseTopBar } from 'src/components/baseComponent';

const TopBar: React.FC = () => {
  return (
    <BaseTopBar>
      <Flex display={{ base: 'flex', md: 'none' }}>
        <GiHamburgerMenu />
      </Flex>
    </BaseTopBar>
  );
};

export default TopBar;
