import React, { useState } from 'react';
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
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { resources } from 'src/store/selectors';
import { deleteData } from 'src/store/actions/resources';
import { errorToastfier } from 'src/utils/toastifier';
import { RootState } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import AkunTableContainer from './AkunTableContainer';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const GuruContent: React.FC<Props> = ({ gurus, deleteGuru }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const deleteUser = async () => {
    try {
      if (!userId) return;

      await deleteGuru(RESOURCE_NAME.USERS, userId);

      onClose();
    } catch (e) {
      errorToastfier(e);
    }
  };

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
          Data User Guru
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
                <Th color="white" bg={'royalRed.200'}>
                  Nama Lengkap
                </Th>
                <Th color="white" bg={'royalRed.200'}>
                  NIP/NRK
                </Th>
                <Th color="white" bg={'royalRed.200'}>
                  Alamat
                </Th>
                <Th color="white" bg={'royalRed.200'} textAlign="center" borderTopRightRadius={10}>
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(_.toArray(gurus.rows), (guru, index) => (
                <Tr key={index}>
                  <Td>{index}</Td>
                  <Td>{guru.namaLengkap}</Td>
                  <Td>{guru.nipNrk}</Td>
                  <Td>{guru.alamat}</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <FaEdit />
                      <FaTrash
                        onClick={() => {
                          setUserId(guru.userId);
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
  gurus: resources.getResource(state, RESOURCE_NAME.GURUS),
});

const connector = connect(mapStateToProps, {
  deleteGuru: deleteData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(GuruContent);
