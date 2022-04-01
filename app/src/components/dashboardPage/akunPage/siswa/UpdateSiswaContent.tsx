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
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { siswaSchema } from 'src/utils/formSchema';
import { DashboardContainer, DashboardMainContainer } from 'src/components/baseComponent';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { USER_ROLE, RESOURCE_NAME } from 'src/utils/constant';
import { updateUser as _updateUser } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/utils/useIdQuery';
import { ICreateUser } from 'src/utils/interface';
import useGetDataById from 'src/utils/useGetDataById';

const UpdateSiswaContent: React.FC<Props> = ({ updateSiswa }) => {
  const queryId = useIdQuery();
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, queryId);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<ICreateUser['SISWA']>) => {
    try {
      if (_.isNil(siswa)) return;

      await updateSiswa(queryId, value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  return (
    <DashboardMainContainer>
      {siswa ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data User Siswa
          </Text>
          <DashboardContainer>
            <Flex p={5} flexDirection={'column'} height={'100%'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'}>
                Formulir Pembaruan Akun Siswa
              </Text>
              <Formik
                initialValues={{
                  namaLengkap: siswa?.namaLengkap,
                  password: '',
                  nis: siswa?.nis,
                  nisn: siswa?.nisn,
                  alamat: siswa?.alamat,
                  role: USER_ROLE.SISWA,
                }}
                validationSchema={siswaSchema}
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
                      <FormControl isInvalid={!!errors.nis && touched.nis}>
                        <FormLabel>NIS</FormLabel>
                        <Input
                          id="nis"
                          placeholder="NIS"
                          value={values.nis}
                          onChange={handleChange('nis')}
                          onBlur={handleBlur('nis')}
                          {...createUserInput}
                          disabled
                        />
                        {!!errors.nis && touched.nis && (
                          <FormErrorMessage>{errors.nis}</FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl isInvalid={!!errors.nisn && touched.nisn}>
                        <FormLabel>NISN</FormLabel>
                        <Input
                          id="nisn"
                          placeholder="NISN"
                          value={values.nisn}
                          onChange={handleChange('nisn')}
                          onBlur={handleBlur('nisn')}
                          {...createUserInput}
                          disabled
                        />
                        {!!errors.nisn && touched.nisn && (
                          <FormErrorMessage>{errors.nisn}</FormErrorMessage>
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
                      <Button
                        {...buttonStyle.confirmation}
                        fontFamily="poppins"
                        fontSize={'0.813rem'}
                        px={10}
                        borderRadius={6}
                        _focus={{ border: 'none' }}
                        type={'submit'}
                      >
                        Submit
                      </Button>
                    </VStack>
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
  updateSiswa: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateSiswaContent);
