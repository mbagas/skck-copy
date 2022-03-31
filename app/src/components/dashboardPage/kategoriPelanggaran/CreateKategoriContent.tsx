import React from 'react';
import {
  Flex,
  Text,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { kategoriSchema } from 'src/utils/formSchema';
import { createUserInput } from 'src/utils/styles';
import { createKategori as _createKategori } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { IBaseKategoriPelanggaran } from 'src/utils/interface';
import { DashboardContainer } from 'src/components/baseComponent';

const CreateKategoriContent: React.FC<Props> = ({ createKategori }) => {
  const create = async (value: IBaseKategoriPelanggaran) => {
    try {
      await createKategori(value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      <Flex flexDirection="column" width="100%">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Kategori Pelanggaran
        </Text>
        <DashboardContainer>
          <Flex p={10} m={5} flexDirection={'column'}>
            <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
              Formulir Pembuatan Pelanggaran
            </Text>
            <Formik
              initialValues={{
                namaKategori: '',
                poin: 0,
              }}
              validationSchema={kategoriSchema}
              onSubmit={create}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <VStack spacing={2} py={5}>
                    <FormControl isInvalid={!!errors.namaKategori && touched.namaKategori}>
                      <FormLabel>Kategori Pelanggaran</FormLabel>
                      <Input
                        id="namaKategori"
                        placeholder="Kategori Pelanggaran"
                        value={values.namaKategori}
                        onChange={handleChange('namaKategori')}
                        onBlur={handleBlur('namaKategori')}
                        {...createUserInput}
                      />
                      {!!errors.namaKategori && touched.namaKategori && (
                        <FormErrorMessage>{errors.namaKategori}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.poin && touched.poin}>
                      <FormLabel>Poin</FormLabel>
                      <Input
                        id="poin"
                        placeholder="Poin"
                        value={values.poin}
                        onChange={handleChange('poin')}
                        onBlur={handleBlur('poin')}
                        type="number"
                        min={1}
                        {...createUserInput}
                      />
                      {!!errors.poin && touched.poin && (
                        <FormErrorMessage>{errors.poin}</FormErrorMessage>
                      )}
                    </FormControl>
                  </VStack>
                  <Spacer />
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
                    type="submit"
                  >
                    Tambah Aturan
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </DashboardContainer>
      </Flex>
    </Flex>
  );
};
const connector = connect(null, {
  createKategori: _createKategori,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CreateKategoriContent);
