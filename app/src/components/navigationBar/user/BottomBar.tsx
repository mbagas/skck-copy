import _ from 'lodash';
import React from 'react';
import Router from 'next/router';
import { AspectRatio, Flex, Grid, GridItem } from '@chakra-ui/react';
import { GRID_ITEM } from 'src/utils/automation/user/navigationBar';

const BottomBar: React.FC = () => {
  const generateGridItem = () =>
    _.map(GRID_ITEM, ({ ELEMENT, ROUTE }, key) => (
      <GridItem key={key} onClick={() => Router.push(ROUTE)}>
        <Flex justifyContent={'center'} alignItems={'center'}>
          <AspectRatio ratio={1} width={5}>
            <ELEMENT />
          </AspectRatio>
        </Flex>
      </GridItem>
    ));

  return (
    <Flex bg={'white'} overflow="visible" bottom={0} width={'100%'} py={3}>
      <Grid templateColumns={'repeat(4, 1fr)'} gap={4} width={'100%'} position={'relative'}>
        {generateGridItem()}
      </Grid>
    </Flex>
  );
};

export default BottomBar;
