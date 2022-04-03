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
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { kategoriSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { RESOURCE_NAME } from 'src/utils/constant';
import { updateKategori as _updateKategori } from 'src/store/actions/resources';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import { IKategoriPelanggaran } from 'src/utils/interface';
import useIdQuery from 'src/utils/useIdQuery';
import { DashboardContainer, DashboardMainContainer } from 'src/components/baseComponent';
import useGetDataById from 'src/utils/useGetDataById';

const UpdateKategoriContent: React.FC<Props> = ({ updateKategori }) => {
  const queryId = useIdQuery();
  const kategori = useGetDataById(RESOURCE_NAME.KATEGORI_PELANGGARANS, queryId);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const create = async (value: Partial<IKategoriPelanggaran>) => {
    setIsRequested(true);

    try {
      await updateKategori(queryId, value);

      toastfier('Kategori berhasil diperbarui', { type: 'success' });

      return setTimeout(() => {
        Router.push('/dashboard/kategori-pelanggarans');
      }, 3000);
    } catch (e) {
      errorToastfier(e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardMainContainer>
      {kategori ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Kategori Pelanggaran
          </Text>
          <DashboardContainer overflow={'auto'}>
            <Flex p={10} m={5} flexDirection={'column'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Pelanggaran
              </Text>
              <Formik
                initialValues={{
                  namaKategori: kategori?.namaKategori,
                  poin: kategori?.poin,
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
                      {...buttonStyle.confirmation}
                      fontFamily="poppins"
                      fontSize={'0.813rem'}
                      px={10}
                      borderRadius={6}
                      _focus={{ border: 'none' }}
                      type="submit"
                      disabled={isRequested}
                    >
                      Tambah Aturan
                    </Button>
                  </Form>
                )}
              </Formik>
            </Flex>
          </DashboardContainer>
        </React.Fragment>
      ) : null}
    </DashboardMainContainer>
  );
};

const connector = connect(null, {
  updateKategori: _updateKategori,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateKategoriContent);
