import React from 'react';
import _ from 'lodash';
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Text,
  FormControl,
  Input,
  InputRightElement,
  FormErrorMessage,
  FormLabel,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { errorToastfier } from 'src/utils/toastifier';
import { Formik, Form } from 'formik';
import Avatar from 'react-avatar';
import { ISiswaDetail } from 'src/utils/interface';

const ProfileCard: React.FC<Props> = ({ siswa }) => {
  return (
    <Flex borderRadius={25} alignItems="center" position={'relative'} py={3}>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }} gap={3}>
        <GridItem colSpan={4}>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={3}>
            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>

            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>
            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>
            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>
            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>
            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>
            <GridItem>
              <Checkbox value="1">Tidak Pakai Sepatu</Checkbox>
            </GridItem>
            <GridItem>Poin : 100</GridItem>
          </Grid>
        </GridItem>
        <Grid templateColumns={'repeat(1, 1fr)'} gap={3}>
          <Button
            fontFamily="poppins"
            fontSize={'0.813rem'}
            px={10}
            borderRadius={6}
            color="white"
            bg={'royalRed.200'}
            _hover={{
              background: 'royalRed.300',
            }}
            _focus={{ border: 'none' }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Flex>
  );
};

type Props = {
  siswa: ISiswaDetail | undefined;
};

export default ProfileCard;
