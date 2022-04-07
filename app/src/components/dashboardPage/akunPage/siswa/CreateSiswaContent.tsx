import React, { useEffect, useState } from 'react';
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
import Autocomplete from 'chakra-ui-autocomplete';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { DashboardContainer, DashboardMainContainer } from 'src/components/baseComponent';
import { createSiswaSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';
import { createUser as _createUser, getAllData as _getAllData } from 'src/store/actions/resources';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import { ICreateUser } from 'src/utils/interface';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { generateOrangTuaOptions } from 'src/utils/user';
import AutoComplete from 'src/components/baseComponent/AutoComplete';

const CreateSiswaContent: React.FC<Props> = ({ createSiswa, getAllData, orangTuas }) => {
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const [orangTuaId, setOrangTuaId] = useState('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const create = async (value: ICreateUser['SISWA']) => {
    setIsRequested(true);

    try {
      await createSiswa({ ...value, orangTuaId: _.toNumber(orangTuaId) });
      toastfier('Siswa berhasil ditambahkan', { type: 'success' });

      return setTimeout(() => {
        Router.push('/dashboard/akun/siswas');
      }, 3000);
    } catch (e) {
      errorToastfier(e);
    }

    setIsRequested(false);
  };

  const validateOrangTua = (toValidate: string | null = null) => {
    setIsTouched(true);
    setIsError('');

    const orangTua = _.find(orangTuas.rows, ['namaLengkap', toValidate]);

    let ortuId = 0;

    // If there is an input
    if (!_.isNil(orangTua)) ortuId = orangTua.id;

    // If the input is empty and no selected value
    if ((_.isEmpty(orangTuaId) || !_.isNumber(_.toNumber(orangTuaId))) && !ortuId) {
      setIsError('Nama orang tua tidak boleh kosong');
      return false;
    }

    // If the input is exists and not same as selected value, update
    if (ortuId && ortuId !== _.toNumber(orangTuaId)) {
      setOrangTuaId(`${ortuId}`);
    }

    return true;
  };

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.ORANG_TUAS);
    })();
  }, []); // eslint-disable-line

  return (
    <DashboardMainContainer>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Data User Siswa
      </Text>
      <DashboardContainer overflow={'auto'}>
        <Flex p={5} flexDirection={'column'} height={'100%'}>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'}>
            Formulir Pembuatan Akun Siswa
          </Text>
          <Formik
            initialValues={{
              namaLengkap: '',
              password: '',
              nis: '',
              nisn: '',
              alamat: '',
              role: USER_ROLE.SISWA,
            }}
            validationSchema={createSiswaSchema}
            onSubmit={create}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (!validateOrangTua()) return;

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
                      required
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
                        required
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
                  <FormControl isInvalid={!_.isEmpty(isError) && isTouched}>
                    <FormLabel>Nama Orang Tua</FormLabel>
                    <AutoComplete
                      onChange={(e) => setOrangTuaId(`${e.value}`)}
                      options={generateOrangTuaOptions(orangTuas)}
                      onClick={() => setIsTouched(false)}
                      onLostFocus={validateOrangTua}
                      placeholder="Nama Orang Tua"
                      isRequired
                    />
                    {!_.isEmpty(isError) && isTouched && (
                      <FormErrorMessage>{isError}</FormErrorMessage>
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
                      required
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
                      required
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
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </DashboardContainer>
    </DashboardMainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  orangTuas: resources.getResource(state, RESOURCE_NAME.ORANG_TUAS),
});

const connector = connect(mapStateToProps, {
  createSiswa: _createUser,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CreateSiswaContent);
