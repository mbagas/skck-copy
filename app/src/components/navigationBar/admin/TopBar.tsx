import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Flex } from '@chakra-ui/react';
import { BaseTopBar } from 'src/components/baseComponent';

const TopBar: React.FC<Props> = ({ setShow }) => {
  return (
    <BaseTopBar>
      <Flex display={{ base: 'flex', md: 'none' }} _hover={{ color: 'royalRed.100' }}>
        <GiHamburgerMenu onClick={() => setShow((curr) => !curr)} />
      </Flex>
    </BaseTopBar>
  );
};

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default TopBar;
