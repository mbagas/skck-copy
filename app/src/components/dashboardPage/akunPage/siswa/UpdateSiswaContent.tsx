import React, { useState } from 'react';
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
import AdminContainer from '../../AdminContainer';
import { siswaSchema } from 'src/utils/formSchema';
import { createUserInput } from 'src/utils/styles';
import { USER_ROLE, RESOURCE_NAME } from 'src/utils/constant';
import { RootState } from 'src/store';
import { updateUser as _updateUser } from 'src/store/actions/resources';
import { getResourceByIdInRoutes } from 'src/store/selectors/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { ISiswa } from 'src/utils/interface';
import useIdQuery from 'src/utils/useIdQuery';
import useDebounce from 'src/utils/useDebounce';
import { ICreateUser } from 'src/utils/interface';

const UpdateSiswaContent: React.FC<Props> = ({ getSiswaById, updateSiswa }) => {
  const queryId = useIdQuery();
  const [siswa, setSiswa] = useState<ISiswa>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<ICreateUser['SISWA']>) => {
    try {
      await updateSiswa(queryId, value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  useDebounce(
    () => {
      setSiswa(getSiswaById(queryId));
    },
    500,
    [queryId]
  );

  useDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [siswa]
  );

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      {isLoaded ? (
        <Flex flexDirection="column" width="100%">
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data User Siswa
          </Text>
          <AdminContainer>
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
                        type={'submit'}
                      >
                        Submit
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Flex>
          </AdminContainer>
        </Flex>
      ) : null}
    </Flex>
  );
};

const mapStateToProps = (state: RootState) => ({
  getSiswaById: getResourceByIdInRoutes(RESOURCE_NAME.SISWAS, state),
});

const connector = connect(mapStateToProps, {
  updateSiswa: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateSiswaContent);
