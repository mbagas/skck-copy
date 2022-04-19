import { Flex } from '@chakra-ui/react';
import { BaseTopBar } from 'src/components/baseComponent';

const SPLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'} width={'100vw'} height={'100vh'}>
      <BaseTopBar />
      <Flex width={'100%'} height={'100%'}>
        {children}
      </Flex>
    </Flex>
  );
};

export default SPLayout;
