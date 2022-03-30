import React, { useState } from 'react';
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
import { RESOURCE_NAME } from 'src/utils/constant';
import { RootState } from 'src/store';
import { updateKategori as _updateKategori } from 'src/store/actions/resources';
import { getResourceByIdInRoutes } from 'src/store/selectors/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { IKategoriPelanggaran } from 'src/utils/interface';
import useIdQuery from 'src/utils/useIdQuery';
import useDebounce from 'src/utils/useDebounce';
import { DashboardContainer } from 'src/components/baseComponent';

const UpdateKategoriContent: React.FC<Props> = ({ updateKategori, getKategoriById }) => {
  const queryId = useIdQuery();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [kategori, setKategori] = useState<IKategoriPelanggaran>();

  const create = async (value: Partial<IKategoriPelanggaran>) => {
    try {
      await updateKategori(queryId, value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  useDebounce(
    () => {
      setKategori(getKategoriById(queryId));
    },
    500,
    [queryId]
  );

  useDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [kategori]
  );

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      {isLoaded ? (
        <Flex flexDirection="column" width="100%">
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Kategori Pelanggaran
          </Text>
          <DashboardContainer>
            <Flex p={10} m={5} flexDirection={'column'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Pelanggaran
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
      ) : null}
    </Flex>
  );
};

const mapStateToProps = (state: RootState) => ({
  getKategoriById: getResourceByIdInRoutes(RESOURCE_NAME.KATEGORI_PELANGGARANS, state),
});

const connector = connect(mapStateToProps, {
  updateKategori: _updateKategori,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateKategoriContent);
