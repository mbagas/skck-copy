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
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { DashboardContainer, DashboardMainContainer } from 'src/components/baseComponent';
import { adminSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';
import { updateUser as _updateUser } from 'src/store/actions/resources';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/utils/useIdQuery';
import { ICreateUser } from 'src/utils/interface';
import useGetDataById from 'src/utils/useGetDataById';

const UpdateAdminContent: React.FC<Props> = ({ updateAdmin }) => {
  const queryId = useIdQuery();
  const admin = useGetDataById(RESOURCE_NAME.USERS, queryId);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<ICreateUser['ADMIN']>) => {
    setIsRequested(true);

    try {
      await updateAdmin(queryId, value);
      toastfier('Admin berhasil diperbarui', { type: 'success' });

      return setTimeout(() => {
        Router.push('/dashboard/akun/admins');
      }, 3000);
    } catch (e) {
      errorToastfier(e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardMainContainer>
      {admin ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data Admin
          </Text>
          <DashboardContainer overflow={'auto'}>
            <Flex p={5} flexDirection={'column'} height={'100%'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Akun Admin
              </Text>
              <Formik
                initialValues={{
                  userName: admin?.userName,
                  password: admin?.password,
                  role: USER_ROLE.ADMIN,
                }}
                validationSchema={adminSchema}
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
                      <FormControl isInvalid={!!errors.userName && touched.userName}>
                        <FormLabel>Username</FormLabel>
                        <Input
                          id="userName"
                          placeholder="Username"
                          value={values.userName}
                          onChange={handleChange('userName')}
                          onBlur={handleBlur('userName')}
                          {...createUserInput}
                        />
                        {!!errors.userName && touched.userName && (
                          <FormErrorMessage>{errors.userName}</FormErrorMessage>
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
  updateAdmin: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateAdminContent);
