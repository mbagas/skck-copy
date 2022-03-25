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
  Spacer,
} from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import AdminContainer from '../../AdminContainer';
import { guruSchema } from 'src/utils/formSchema';
import { createUserInput } from 'src/utils/styles';
import { USER_ROLE, RESOURCE_NAME } from 'src/utils/constant';
import { RootState } from 'src/store';
import { updateUser as _updateUser } from 'src/store/actions/resources';
import { getResourceByIdInRoutes } from 'src/store/selectors/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { IGuru } from 'src/utils/interface';
import useIdQuery from 'src/utils/useIdQuery';
import useDebounce from 'src/utils/useDebounce';
import { ICreateUser } from 'src/utils/interface';

const UpdateOrangTuaContent: React.FC<Props> = ({ getGuruById, updateGuru }) => {
  const queryId = useIdQuery();
  const [guru, setGuru] = useState<IGuru>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<ICreateUser['GURU']>) => {
    try {
      await updateGuru(queryId, value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  useDebounce(
    () => {
      setGuru(getGuruById(queryId));
    },
    500,
    [queryId]
  );

  useDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [guru]
  );

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      {isLoaded ? (
        <Flex flexDirection="column" width="100%">
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data User Orang Tua
          </Text>
          <AdminContainer>
            <Flex p={10} m={5} flexDirection={'column'}>
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
                    <VStack spacing={2} py={5}>
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
                      >
                        Update
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
  getGuruById: getResourceByIdInRoutes(RESOURCE_NAME.GURUS, state),
});

const connector = connect(mapStateToProps, {
  updateGuru: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateOrangTuaContent);
