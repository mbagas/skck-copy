import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { deleteData, getAllData as _getAllData } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { RESOURCE_NAME } from 'src/utils/constant';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getSiswaFilter } from 'src/utils/user';
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
  Pagination,
} from 'src/components/baseComponent';
import { buttonStyle } from 'src/utils/styles';

const SiswaContent: React.FC<Props> = ({ siswas, deleteSiswa, getAllData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [siswaId, setSiswaId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);

  const onClose = () => {
    setIsOpen(false);
  };

  const getDatas = async () => {
    if (firstLoad) return;

    await getAllData(
      RESOURCE_NAME.SISWAS,
      `page=${page}&limit=${limit}&${getSiswaFilter(searchValue)}`
    );
  };

  const deleteUser = async () => {
    try {
      if (!userId || !siswaId) return;

      await deleteSiswa(RESOURCE_NAME.USERS, userId);
      await deleteSiswa(RESOURCE_NAME.SISWAS, siswaId, true);
      getDatas();

      onClose();
    } catch (e) {
      errorToastfier(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.SISWAS, `page=${page}&limit=${limit}`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(getDatas, 1000, [searchValue, page]);

  return (
    <React.Fragment>
      <DashboardMainContainer>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Data User Siswa
        </Text>
        <DashboardContainer px={10} flexDirection={'column'}>
          <Flex mb={4} mt={8} justifyContent={'space-between'} alignItems="center">
            <Button
              {...buttonStyle.confirmation}
              fontFamily="poppins"
              fontSize={'0.813rem'}
              px={10}
              borderRadius={25}
              _focus={{ border: 'none' }}
              onClick={() => Router.push(`${Router.pathname}/create`)}
            >
              Tambah
            </Button>
            <InputGroup width={'15rem'} boxShadow={'lg'} borderRadius={25}>
              <Input
                px={10}
                color="black"
                borderRadius={25}
                fontFamily="poppins"
                fontSize={'0.813rem'}
                placeholder="Cari"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <InputRightElement pointerEvents="none">
                <FaSearch />
              </InputRightElement>
            </InputGroup>
          </Flex>
          <DashboardTableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th color="white" bg={'royalRed.200'} borderTopLeftRadius={10}>
                    No
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'65%'}>
                    Nama
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'10%'}>
                    NIS
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'10%'}>
                    NISN
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'15%'}>
                    Alamat
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    textAlign="center"
                    borderTopRightRadius={10}
                  >
                    Aksi
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {_.map(_.toArray(siswas.rows), (siswa, index) => (
                  <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                    <Td>{(page === 1 ? 1 : (page - 1) * limit + 1) + index}</Td>
                    <Td>{siswa.namaLengkap}</Td>
                    <Td>{siswa.nis}</Td>
                    <Td>{siswa.nisn}</Td>
                    <Td>{siswa.alamat}</Td>
                    <Td>
                      <Flex justifyContent={'space-between'}>
                        <FaEdit
                          onClick={() => Router.push(`${Router.pathname}/${siswa.id}/update`)}
                        />
                        <Spacer />
                        <FaTrash
                          onClick={() => {
                            setUserId(siswa.userId);
                            setSiswaId(siswa.id);
                            setIsOpen(true);
                          }}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </DashboardTableContainer>
          <Pagination limit={limit} total={siswas.count} page={page} setPage={setPage} />
        </DashboardContainer>
      </DashboardMainContainer>
      <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onSubmit={deleteUser} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  siswas: resources.getResource(RESOURCE_NAME.SISWAS)(state),
});

const connector = connect(mapStateToProps, {
  deleteSiswa: deleteData,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(SiswaContent);
