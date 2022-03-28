import React from 'react';
import {
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { FaSearch } from 'react-icons/fa';

import AkunTableContainer from '../akunPage/AkunTableContainer';

const KategoriContent = () => {
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
                  Kategori Pelanggaran
                </Th>
                <Th color="white" bg={'royalRed.200'}>
                  Point
                </Th>
                <Th color="white" bg={'royalRed.200'} textAlign="center" borderTopRightRadius={10}>
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </AkunTableContainer>
      </Flex>
    </React.Fragment>
  );
};

export default KategoriContent;
