import React from 'react';
import { Box, Flex, Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import { FaUser, FaHome, FaChartBar } from 'react-icons/fa';

const Card: React.FC<Props> = ({ bGround, title, data, children }) => {
  return (
    <Box bg={bGround} width={{ base: '100%', md: '100%' }} color="white" borderRadius={10}>
      <Grid gap={3} templateColumns={'repeat(2, 1fr)'}>
        <GridItem colSpan={2} pl="1rem">
          <Text fontFamily={'Poppins'} fontWeight="700" fontSize={'1.45rem'}>
            {title}
          </Text>
        </GridItem>
        <GridItem colSpan={1} pl="1rem" pt={7}>
          <Text fontFamily={'Poppins'} fontSize={'1.2rem'}>
            {data}
          </Text>
        </GridItem>
        <GridItem colSpan={1} textAlign="end" justifyContent="end">
          <Flex justifyContent="end" pr={5} pb={5}>
            {children}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

type Props = {
  bGround: string;
  title: string;
  data: number;
};

export default Card;
