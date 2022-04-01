import React, { useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { guruSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { USER_ROLE, RESOURCE_NAME } from 'src/utils/constant';
import { updateUser as _updateUser } from 'src/store/actions/resources';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/utils/useIdQuery';
import { ICreateUser } from 'src/utils/interface';
import { DashboardContainer, DashboardMainContainer } from 'src/components/baseComponent';
import useGetDataById from 'src/utils/useGetDataById';

const UpdateOrangTuaContent: React.FC<Props> = ({ updateGuru }) => {
  const queryId = useIdQuery();
  const guru = useGetDataById(RESOURCE_NAME.GURUS, queryId);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<ICreateUser['GURU']>) => {
    if (_.isNil(guru)) return;

    setIsRequested(true);

    try {
      await updateGuru(guru.userId, value);
      toastfier('Guru berhasil diperbarui', { type: 'success' });

      return setTimeout(() => {
        Router.push('/dashboard/akun/gurus');
      }, 3000);
    } catch (e) {
      errorToastfier(e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardMainContainer>
      {guru ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data User Orang Tua
          </Text>
          <DashboardContainer overflow={'auto'}>
            <Flex p={5} flexDirection={'column'} height={'100%'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Akun Guru
              </Text>
              <Formik
                initialValues={{
                  namaLengkap: guru?.namaLengkap,
                  password: '',
                  nipNrk: guru?.nipNrk,
                  alamat: guru?.alamat,
                  role: USER_ROLE.GURU,
                }}
                validationSchema={guruSchema}
                onSubmit={update}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <VStack spacing={2} py={2}>
                      <FormControl isInvalid={!!errors.namaLengkap && touched.namaLengkap}>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <Input
                          id="namaLengkap"
                          placeholder="Nama Lengkap"
                          value={values.namaLengkap}
                          onChange={handleChange('namaLengkap')}
                          onBlur={handleBlur('namaLengkap')}
                          {...createUserInput}
                        />
                        {!!errors.namaLengkap && touched.namaLengkap && (
                          <FormErrorMessage>{errors.namaLengkap}</FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl isInvalid={!!errors.password && touched.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            id="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange('password')}
                            onBlur={handleBlur('password')}
                            type={isPassVisible ? 'text' : 'password'}
                            {...createUserInput}
                          />
                          <InputRightElement>
                            {isPassVisible ? (
                              <RiEyeOffFill
                                onClick={() => setIsPassVisible(false)}
                                color="gray.300"
                              />
                            ) : (
                              <RiEyeFill onClick={() => setIsPassVisible(true)} color="gray.300" />
                            )}
                          </InputRightElement>
                        </InputGroup>
                        {!!errors.password && touched.password && (
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl isInvalid={!!errors.nipNrk && touched.nipNrk}>
                        <FormLabel>NIP/NRK</FormLabel>
                        <Input
                          id="nipNrk"
                          placeholder="NIP/NRK"
                          value={values.nipNrk}
                          onChange={handleChange('nipNrk')}
                          onBlur={handleBlur('nipNrk')}
                          {...createUserInput}
                        />
                        {!!errors.nipNrk && touched.nipNrk && (
                          <FormErrorMessage>{errors.nipNrk}</FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl isInvalid={!!errors.alamat && touched.alamat}>
                        <FormLabel>Alamat</FormLabel>
                        <Input
                          id="alamat"
                          placeholder="Alamat"
                          value={values.alamat}
                          onChange={handleChange('alamat')}
                          onBlur={handleBlur('alamat')}
                          {...createUserInput}
                        />
                        {!!errors.alamat && touched.alamat && (
                          <FormErrorMessage>{errors.alamat}</FormErrorMessage>
                        )}
                      </FormControl>
                    </VStack>
                    <Button
                      {...buttonStyle.confirmation}
                      fontFamily="poppins"
                      fontSize={'0.813rem'}
                      px={10}
                      borderRadius={6}
                      _focus={{ border: 'none' }}
                      type={'submit'}
                      disabled={isRequested}
                    >
                      Update
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
  updateGuru: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateOrangTuaContent);
