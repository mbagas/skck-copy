import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Table,
  Tr,
  Td,
  Th,
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
import AkunTableContainer from '../akunPage/AkunTableContainer';
import { RESOURCE_NAME } from 'src/utils/constant';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { errorToastfier } from 'src/utils/toastifier';
import { deleteData, getAllData as _getAllData } from 'src/store/actions/resources';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getKategoriPelanggaranFilter } from 'src/utils/pelanggaran';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';

const KategoriContent: React.FC<Props> = ({ kategoris, deleteKategori, getAllData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [kategoriId, setKategoriId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const deleteUser = async () => {
    try {
      if (!kategoriId) return;

      await deleteKategori(RESOURCE_NAME.KATEGORI_PELANGGARANS, kategoriId);

      onClose();
    } catch (e) {
      errorToastfier(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.KATEGORI_PELANGGARANS, `page=${page}&limit=15`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllData(
        RESOURCE_NAME.KATEGORI_PELANGGARANS,
        `page=${page}&limit=15&${getKategoriPelanggaranFilter(searchValue)}`
      );
    },
    1000,
    [searchValue]
  );

  return (
    <React.Fragment>
      <Flex bg="royalGray.100" width={'100%'} height={'100%'} p={3} flexDirection={'column'}>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Kategori Pelanggaran
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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <InputRightElement pointerEvents="none">
                <FaSearch />
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex height={'62.5vh'} width={'100%'} overflow={'overlay'} flexDirection={'column'}>
            <Table>
              <Thead>
                <Tr>
                  <Th color="white" bg={'royalRed.200'} borderTopLeftRadius={10}>
                    No
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'90%'}>
                    Kategori Pelanggaran
                  </Th>
                  <Th color="white" bg={'royalRed.200'}>
                    Point
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
                {_.map(_.toArray(kategoris.rows), (kategori, index) => (
                  <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                    <Td>{index + 1}</Td>
                    <Td>{kategori.namaKategori}</Td>
                    <Td>{kategori.poin}</Td>
                    <Td>
                      <Flex justifyContent={'space-between'}>
                        <FaEdit
                          onClick={() => Router.push(`${Router.pathname}/${kategori.id}/update`)}
                        />
                        <FaTrash
                          onClick={() => {
                            setKategoriId(kategori.id);
                            setIsOpen(true);
                          }}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </AkunTableContainer>
      </Flex>
      <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onSubmit={deleteUser} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  kategoris: resources.getResource(state, RESOURCE_NAME.KATEGORI_PELANGGARANS),
});

const connector = connect(mapStateToProps, {
  deleteKategori: deleteData,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(KategoriContent);
