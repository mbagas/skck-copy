import React from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { AspectRatio, HStack } from '@chakra-ui/react';
import BaseTopBar from 'src/components/baseComponent/BaseTopBar';
import { GRID_ITEM } from 'src/utils/automation/user/navigationBar';

const TopBar: React.FC = () => {
  const generateGridItem = () =>
    _.map(GRID_ITEM, ({ ELEMENT, ROUTE }, key) => (
      <AspectRatio key={key} ratio={1} width={6} onClick={() => Router.push(ROUTE)}>
        <ELEMENT />
      </AspectRatio>
    ));

  return (
    <BaseTopBar>
      <HStack spacing={10}>{generateGridItem()}</HStack>
    </BaseTopBar>
  );
};

export default TopBar;
