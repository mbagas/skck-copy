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
} from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import AdminContainer from '../../AdminContainer';
import { adminSchema } from 'src/utils/formSchema';
import { createUserInput } from 'src/utils/styles';
import { USER_ROLE } from 'src/utils/constant';
import { createUser as _createUser } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { ICreateUser } from 'src/utils/interface';

const CreateAdminContent: React.FC<Props> = ({ createAdmin }) => {
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const create = async (value: ICreateUser['ADMIN']) => {
    try {
      await createAdmin(value);
    } catch (e) {
      errorToastfier(e);
    }
  };

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      <Flex flexDirection="column" width="100%">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Data Admin
        </Text>
        <AdminContainer>
          <Flex p={10} m={5} flexDirection={'column'}>
            <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
              Formulir Pembuatan Akun Admin
            </Text>
            <Formik
              initialValues={{
                userName: '',
                password: '',
                role: USER_ROLE.ADMIN,
              }}
              validationSchema={adminSchema}
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
                </Form>
              )}
            </Formik>
          </Flex>
        </AdminContainer>
      </Flex>
    </Flex>
  );
};

const connector = connect(null, {
  createAdmin: _createUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CreateAdminContent);