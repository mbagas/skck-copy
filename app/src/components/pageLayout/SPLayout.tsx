import { Flex } from '@chakra-ui/react';
import { BaseTopBar } from 'src/components/baseComponent';

const SPLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'}>
      <BaseTopBar />
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default SPLayout;
