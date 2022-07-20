import React, { useEffect, useState } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { resources } from 'src/store/selectors';
import { deleteData, getAllData as _getAllData } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { RootState } from 'src/store';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getGuruFilter } from 'src/utils/user';
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
  Pagination,
  UploadCSV,
} from 'src/components/baseComponent';
import { buttonStyle } from 'src/utils/styles';

const GuruContent: React.FC<Props> = ({ gurus, deleteGuru, getAllData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [guruId, setGuruId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);
  const { isOpen: isCsvOpen, onClose: onCsvClose, onOpen: onCsvOpen } = useDisclosure();

  const onClose = () => {
    setIsOpen(false);
  };

  const getDatas = async () => {
    if (firstLoad) return;

    await getAllData(
      RESOURCE_NAME.GURUS,
      `page=${page}&limit=${limit}&${getGuruFilter(searchValue)}`
    );
  };

  const deleteUser = async () => {
    try {
      if (!userId || !guruId) return;

      await deleteGuru(RESOURCE_NAME.USERS, userId);
      await deleteGuru(RESOURCE_NAME.GURUS, guruId, true);
      getDatas();

      onClose();
    } catch (e) {
      errorToastfier(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.GURUS, `page=${page}&limit=${limit}`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(getDatas, 1000, [searchValue, page]);

  return (
    <React.Fragment>
      <DashboardMainContainer>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Data User Guru
        </Text>
        <DashboardContainer px={10} flexDirection={'column'}>
          <Flex mb={4} mt={8} justifyContent={'space-between'} alignItems="center">
            <Flex gap={2}>
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
              <Button
                {...buttonStyle.confirmation}
                fontFamily="poppins"
                fontSize={'0.813rem'}
                px={10}
                borderRadius={25}
                _focus={{ border: 'none' }}
                onClick={onCsvOpen}
              >
                Import CSV
              </Button>
            </Flex>
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
                    Nama Lengkap
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'10%'}>
                    NIP/NRK
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'25%'}>
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
                {_.map(_.values(gurus.rows), (guru, index) => (
                  <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                    <Td>{(page === 1 ? 1 : (page - 1) * limit + 1) + index}</Td>
                    <Td>{guru.namaLengkap}</Td>
                    <Td>{guru.nipNrk}</Td>
                    <Td>{guru.alamat}</Td>
                    <Td>
                      <Flex justifyContent={'space-between'}>
                        <FaEdit
                          onClick={() => Router.push(`${Router.pathname}/${guru.id}/update`)}
                          cursor={'pointer'}
                        />
                        <Spacer />
                        <FaTrash
                          onClick={() => {
                            setUserId(guru.userId);
                            setGuruId(guru.id);
                            setIsOpen(true);
                          }}
                          cursor={'pointer'}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </DashboardTableContainer>
          <Pagination limit={limit} total={gurus.count} page={page} setPage={setPage} />
        </DashboardContainer>
      </DashboardMainContainer>
      <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onSubmit={deleteUser} />
      <UploadCSV isOpen={isCsvOpen} onClose={onCsvClose} role={USER_ROLE.GURU} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  gurus: resources.getResource(RESOURCE_NAME.GURUS)(state),
});

const connector = connect(mapStateToProps, {
  deleteGuru: deleteData,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(GuruContent);
