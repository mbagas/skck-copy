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
import { siswaSchema } from 'src/utils/formSchema';
import { DashboardContainer, DashboardMainContainer } from 'src/components/baseComponent';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { USER_ROLE, RESOURCE_NAME } from 'src/utils/constant';
import { updateUser as _updateUser, getAllData as _getAllData } from 'src/store/actions/resources';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/utils/useIdQuery';
import { ICreateUser } from 'src/utils/interface';
import useGetDataById from 'src/utils/useGetDataById';
import AutoComplete, { Options } from 'src/components/baseComponent/AutoComplete';
import { generateOrangTuaOptions } from 'src/utils/user';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import useCustomDebounce from 'src/utils/useCustomDebounce';

const UpdateSiswaContent: React.FC<Props> = ({ updateSiswa, getAllData, orangTuas }) => {
  const queryId = useIdQuery();
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, queryId);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const [orangTuaId, setOrangTuaId] = useState('');
  const [prevOrangTua, setPrevOrangTua] = useState<Options>({ label: '', value: '' });
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const update = async (value: Partial<ICreateUser['SISWA']>) => {
    if (_.isNil(siswa)) return;

    setIsRequested(true);

    try {
      await updateSiswa(siswa.userId, { ...value, orangTuaId: _.toNumber(orangTuaId) });
      toastfier('Siswa berhasil diperbarui', { type: 'success' });

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

  useCustomDebounce(
    () => {
      if (!siswa) return;

      const orangTua = orangTuas.rows[siswa.orangTuaId];

      if (orangTua) {
        setPrevOrangTua({ label: orangTua.namaLengkap, value: orangTua.id });
        setOrangTuaId(`${orangTua.id}`);
      }

      setIsLoaded(true);
    },
    500,
    [siswa]
  );

  return (
    <DashboardMainContainer>
      {isLoaded ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data User Siswa
          </Text>
          <DashboardContainer overflow={'auto'}>
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
                      <FormControl isInvalid={!_.isEmpty(isError) && isTouched}>
                        <FormLabel>Nama Orang Tua</FormLabel>
                        <AutoComplete
                          onChange={(e) => setOrangTuaId(`${e.value}`)}
                          options={generateOrangTuaOptions(orangTuas)}
                          onClick={() => setIsTouched(false)}
                          onLostFocus={validateOrangTua}
                          value={prevOrangTua}
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
                        disabled={isRequested}
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

const mapStateToProps = (state: RootState) => ({
  orangTuas: resources.getResource(state, RESOURCE_NAME.ORANG_TUAS),
});

const connector = connect(mapStateToProps, {
  updateSiswa: _updateUser,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateSiswaContent);
