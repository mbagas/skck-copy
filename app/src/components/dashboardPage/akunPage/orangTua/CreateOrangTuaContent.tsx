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
import { DashboardContainer } from 'src/components/baseComponent';
import { orangTuaSchema } from 'src/utils/formSchema';
import { createUserInput } from 'src/utils/styles';
import { USER_ROLE } from 'src/utils/constant';
import { createUser as _createUser } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { ICreateUser } from 'src/utils/interface';

const CreateOrangTuaContent: React.FC<Props> = ({ createOrangTua }) => {
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const create = async (value: ICreateUser['ORANG_TUA']) => {
    try {
      await createOrangTua(value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      <Flex flexDirection="column" width="100%">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Data User Orang Tua
        </Text>
        <DashboardContainer>
          <Flex p={5} flexDirection={'column'} height={'100%'}>
            <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
              Formulir Pembuatan Akun Orang Tua
            </Text>
            <Formik
              initialValues={{
                namaLengkap: '',
                password: '',
                noTelp: '',
                alamat: '',
                role: USER_ROLE.ORANG_TUA,
              }}
              validationSchema={orangTuaSchema}
              onSubmit={create}
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
                    <FormControl isInvalid={!!errors.noTelp && touched.noTelp}>
                      <FormLabel>No Telepon</FormLabel>
                      <Input
                        id="noTelp"
                        placeholder="No Telepon"
                        value={values.noTelp}
                        onChange={handleChange('noTelp')}
                        onBlur={handleBlur('noTelp')}
                        {...createUserInput}
                      />

                      {!!errors.noTelp && touched.noTelp && (
                        <FormErrorMessage>{errors.noTelp}</FormErrorMessage>
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
                    Submit
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
  createOrangTua: _createUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CreateOrangTuaContent);
