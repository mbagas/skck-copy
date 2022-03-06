import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex paddingX={3} paddingY={'2rem'} bgColor="royalGray.300" color={'royalCream.100'}>
      <Text>
        Copyright © 2022{' '}
        <Link
          href="https://github.com/mbagas/skck-copy"
          target="_blank"
          rel="noreferrer"
          color="white"
          textDecoration="underline"
        >
          PTI Knock
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
