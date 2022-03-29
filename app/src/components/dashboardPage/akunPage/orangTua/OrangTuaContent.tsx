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
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { resources } from 'src/store/selectors';
import { deleteData, getAllData as _getAllData } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { RootState } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import AkunTableContainer from '../AkunTableContainer';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getOrangTuaFilter } from 'src/utils/user';

const OrangTuaContent: React.FC<Props> = ({ orangTuas, deleteOrangTua, getAllData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const deleteUser = async () => {
    try {
      if (!userId) return;

      await deleteOrangTua(RESOURCE_NAME.USERS, userId);

      onClose();
    } catch (e) {
      errorToastfier(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.ORANG_TUAS, `page=${page}&limit=15`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllData(
        RESOURCE_NAME.ORANG_TUAS,
        `page=${page}&limit=15&${getOrangTuaFilter(searchValue)}`
      );
    },
    1000,
    [searchValue]
  );

  return (
    <React.Fragment>
      <Flex
        bg="royalGray.100"
        width={'100%'}
        height={'100%'}
        p={3}
        flexDirection={'column'}
        overflow={'auto'}
      >
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Data User Orang Tua
        </Text>
        <AkunTableContainer>
          <Flex mb={4} mt={8} justifyContent={'space-between'} alignItems="center">
            <Button
              fontFamily="poppins"
              fontSize={'0.813rem'}
              px={10}
              borderRadius={25}
              color="white"
              bg={'royalRed.200'}
              _hover={{
                background: 'royalRed.300',
              }}
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
          <Table>
            <Thead>
              <Tr>
                <Th color="white" bg={'royalRed.200'} borderTopLeftRadius={10}>
                  No
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'65%'}>
                  Nama Lengkap
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'25%'}>
                  Alamat
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'10%'}>
                  Nomor Telepon
                </Th>
                <Th color="white" bg={'royalRed.200'} textAlign="center" borderTopRightRadius={10}>
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(_.toArray(orangTuas.rows), (orangTua, index) => (
                <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                  <Td>{index + 1}</Td>
                  <Td>{orangTua.namaLengkap}</Td>
                  <Td>{orangTua.alamat}</Td>
                  <Td>{orangTua.noTelp}</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <FaEdit
                        onClick={() => Router.push(`${Router.pathname}/${orangTua.id}/update`)}
                      />
                      <FaTrash
                        onClick={() => {
                          setUserId(orangTua.userId);
                          setIsOpen(true);
                        }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </AkunTableContainer>
      </Flex>
      <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onSubmit={deleteUser} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  orangTuas: resources.getResource(state, RESOURCE_NAME.ORANG_TUAS),
});

const connector = connect(mapStateToProps, {
  deleteOrangTua: deleteData,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(OrangTuaContent);