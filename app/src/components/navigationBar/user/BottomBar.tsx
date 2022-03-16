import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { VscHome, VscSettingsGear } from 'react-icons/vsc';
import { BsPlusCircleFill } from 'react-icons/bs';

const BottomBar: React.FC<Props> = ({ canCreate, isOnCreate }) => {
  return (
    <Flex bg={'white'} overflow="visible">
      <Grid templateColumns={'repeat(3, 1fr)'} gap={3}>
        <GridItem alignItems={'center'}>
          <VscHome />
        </GridItem>
        <GridItem alignItems={'center'} position="relative">
          {canCreate && isOnCreate && (
            <Flex position="absolute" top={'50%'}>
              <BsPlusCircleFill color={'royalOrange.300'} fontSize={'1.5rem'} />
            </Flex>
          )}
        </GridItem>
        <GridItem alignItems={'center'}>
          <VscSettingsGear />
        </GridItem>
      </Grid>
    </Flex>
  );
};

type Props = {
  isOnCreate: boolean;
  canCreate: boolean;
};

export default BottomBar;
