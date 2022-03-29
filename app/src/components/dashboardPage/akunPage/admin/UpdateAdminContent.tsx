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
import { adminSchema } from 'src/utils/formSchema';
import { createUserInput } from 'src/utils/styles';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';
import { updateUser as _updateUser } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/utils/useIdQuery';
import useDebounce from 'src/utils/useDebounce';
import { ICreateUser, IUser } from 'src/utils/interface';
import { RootState } from 'src/store';
import { getResourceByIdInRoutes } from 'src/store/selectors/resources';

const UpdateAdminContent: React.FC<Props> = ({ getAdminById, updateAdmin }) => {
  const queryId = useIdQuery();
  const [admin, setAdmin] = useState<IUser>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<ICreateUser['ADMIN']>) => {
    try {
      await updateAdmin(queryId, value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  useDebounce(
    () => {
      setAdmin(getAdminById(queryId));
    },
    500,
    [queryId]
  );

  useDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [admin]
  );

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      {isLoaded ? (
        <Flex flexDirection="column" width="100%">
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data Admin
          </Text>
          <AdminContainer>
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
                      Update
                    </Button>
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
  getAdminById: getResourceByIdInRoutes(RESOURCE_NAME.USERS, state),
});

const connector = connect(mapStateToProps, {
  updateAdmin: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateAdminContent);
