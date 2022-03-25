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
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getUserFilter } from 'src/utils/user';

const AdminContent: React.FC<Props> = ({ admins, deleteAdmin, getAllData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchvalue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const deleteUser = async () => {
    try {
      if (!userId) return;

      await deleteAdmin(RESOURCE_NAME.USERS, userId);

      onClose();
    } catch (e) {
      errorToastfier(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.USERS, `page=${page}&limit=15`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllData(RESOURCE_NAME.USERS, `page=${page}&limit=15&${getUserFilter(searchvalue)}`);
    },
    1000,
    [searchvalue]
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
          Data User Admin
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
                value={searchvalue}
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
                <Th color="white" bg={'royalRed.200'} width={'95%'}>
                  Username
                </Th>
                <Th color="white" bg={'royalRed.200'} textAlign="center" borderTopRightRadius={10}>
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(_.toArray(admins.rows), (admin, index) => (
                <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                  <Td>{index + 1}</Td>
                  <Td>{admin.userName}</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <FaEdit
                        onClick={() => Router.push(`${Router.pathname}/${admin.id}/update`)}
                      />
                      <FaTrash
                        onClick={() => {
                          setUserId(admin.id);
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
  admins: resources.getResource(state, RESOURCE_NAME.USERS),
});

const connector = connect(mapStateToProps, {
  deleteAdmin: deleteData,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(AdminContent);
