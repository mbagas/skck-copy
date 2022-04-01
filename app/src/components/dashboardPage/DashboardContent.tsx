import { Flex, Text, AspectRatio, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { FaUser, FaCalendarDay, FaListOl } from 'react-icons/fa';
import { RiBook2Fill } from 'react-icons/ri';
import { Card, DashboardContainer } from '../baseComponent';

const DashboardContent = () => {
  return (
    <Flex
      flexDirection={'column'}
      py={3}
      px={3}
      height={'100%'}
      width={'100vw'}
      bg={'royalGray.100'}
    >
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Dashboard
      </Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} my={3} gap={4}>
        <GridItem colSpan={1}>
          <Card bGround="#4F72D9" title="asd" data={123}>
            <AspectRatio ratio={1} width={12}>
              <FaUser color="#184ADE" />
            </AspectRatio>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bGround="#E64839" title="asd" data={123}>
            <AspectRatio ratio={1} width={12}>
              <RiBook2Fill color="B91D0E" />
            </AspectRatio>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bGround="#F4C33D" title="asd" data={123}>
            <AspectRatio ratio={1} width={12}>
              <FaCalendarDay color="D69F08" />
            </AspectRatio>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bGround="#1ECA8B" title="asd" data={123}>
            <AspectRatio ratio={1} width={12}>
              <FaListOl color="00965F" />
            </AspectRatio>
          </Card>
        </GridItem>
      </Grid>
      <DashboardContainer>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} px={5} py={5}>
          Data Kategori Pelanggaran Harian
        </Text>
      </DashboardContainer>
    </Flex>
  );
};

export default DashboardContent;
