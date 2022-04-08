/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
} from '@chakra-ui/react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import { connect, ConnectedProps } from 'react-redux';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { DashboardContainer } from 'src/components/baseComponent';
import { IChangePass } from 'src/utils/interface';
import { changePassword as _changePassword } from 'src/store/actions/resources';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import { changePasswordSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { getAccountId, getRole } from 'src/utils/sessionUtils';

const SettingsContent: React.FC<Props> = ({ changePassword }) => {
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const changeUserPass = async (value: IChangePass) => {
    setIsRequested(true);

    try {
      await changePassword(getAccountId()!, getRole()!, value);

      toastfier('Password berhasil diperbarui!', { type: 'success' });

      return setTimeout(() => {
        Router.push('/');
      }, 3000);
    } catch (e) {
      errorToastfier(e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardContainer height={'100%'}>
      <Flex flexDirection="column" height={'100%'} width={{ base: '100%', md: '40%' }} p={5}>
        <Text fontSize={20} fontWeight={'medium'} fontFamily={'Poppins'} mb={4}>
          Ganti Password
        </Text>
        <Flex p={3}>
          <Formik
            initialValues={{ oldPassword: '', password: '', confirmationPassword: '' }}
            validationSchema={changePasswordSchema}
            onSubmit={changeUserPass}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <VStack spacing={2} py={2}>
                  <FormControl isInvalid={!!errors.oldPassword && touched.oldPassword} isRequired>
                    <FormLabel>Password Lama</FormLabel>
                    <InputGroup>
                      <Input
                        id="oldPassword"
                        placeholder="Pasword lama"
                        value={values.oldPassword}
                        onChange={handleChange('oldPassword')}
                        onBlur={handleBlur('oldPassword')}
                        {...createUserInput}
                      />
                      <InputRightElement>
                        {isPassVisible ? (
                          <RiEyeOffFill onClick={() => setIsPassVisible(false)} color="gray.300" />
                        ) : (
                          <RiEyeFill onClick={() => setIsPassVisible(true)} color="gray.300" />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {!!errors.oldPassword && touched.oldPassword && (
                      <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password} isRequired>
                    <FormLabel>Password Baru</FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        {...createUserInput}
                      />
                      <InputRightElement>
                        {isPassVisible ? (
                          <RiEyeOffFill onClick={() => setIsPassVisible(false)} color="gray.300" />
                        ) : (
                          <RiEyeFill onClick={() => setIsPassVisible(true)} color="gray.300" />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {!!errors.password && touched.password && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.confirmationPassword && touched.confirmationPassword}
                    isRequired
                  >
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <InputGroup>
                      <Input
                        id="confirmationPassword"
                        placeholder="Konfirmasi Password"
                        value={values.confirmationPassword}
                        onChange={handleChange('confirmationPassword')}
                        onBlur={handleBlur('confirmationPassword')}
                        {...createUserInput}
                      />
                      <InputRightElement>
                        {isPassVisible ? (
                          <RiEyeOffFill onClick={() => setIsPassVisible(false)} color="gray.300" />
                        ) : (
                          <RiEyeFill onClick={() => setIsPassVisible(true)} color="gray.300" />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {!!errors.confirmationPassword && touched.confirmationPassword && (
                      <FormErrorMessage>{errors.confirmationPassword}</FormErrorMessage>
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
                  type="submit"
                  disabled={isRequested}
                  mt={4}
                >
                  Ganti Password
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </DashboardContainer>
  );
};

const connector = connect(null, { changePassword: _changePassword });

type Props = ConnectedProps<typeof connector>;

export default connector(SettingsContent);
