import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import {
  Flex,
  Text,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { RootState } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import { Pagination, SiswaCard } from 'src/components/baseComponent';
import { getAllData as _getAllData } from 'src/store/actions/resources';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getSiswaFilter } from 'src/utils/user';
import { resources } from 'src/store/selectors';
import { generateSiswaCSV } from 'src/utils/csvGenerator';

const GuruOrangTuaView: React.FC<Props> = ({ siswas, getAllData }) => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);
  const [filter, setFilter] = useState<string>('Semua');

  const generateCSV = async () => {
    await getAllData(RESOURCE_NAME.SISWAS, `page=${page}&limit=all&${getSiswaFilter(searchValue)}`);
    generateSiswaCSV(siswas);
  };

  useEffect(() => {
    (async () => {
      await getAllData(
        RESOURCE_NAME.SISWAS,
        `page=${page}&limit=${limit}&${getSiswaFilter(searchValue)}`
      );

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllData(
        RESOURCE_NAME.SISWAS,
        `page=${page}&limit=${limit}&${getSiswaFilter(searchValue)}&spKe=${
          filter === 'Semua' ? '' : filter
        }`
      );
    },
    1000,
    [searchValue, filter, page]
  );

  return (
    <Flex width={'100%'} borderRadius={25} p={3} bg="royalWhite.100" flexDirection="column">
      <Flex flexDirection="column">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} p={5} fontWeight="bold">
          Data Siswa
        </Text>
        <Flex mb={4} mt={5}>
          <InputGroup width={{ base: '65%', md: '25rem' }} boxShadow={'lg'} borderRadius={25}>
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
      </Flex>
      <Flex flexDirection="row" alignItems={'center'}>
        <Select
          p={2}
          width={{ base: '65%', md: '30%' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="1">SP 1</option>
          <option value="2">SP 2</option>
          <option value="3">SP 3</option>
        </Select>
        <Spacer />
        <Flex
          flexDirection="column"
          cursor={'pointer'}
          bg={'royalGray.100'}
          _hover={{ bg: 'royalGray.200' }}
          rounded={'md'}
          width={{ base: '2.5rem', md: '3rem' }}
          alignItems={'center'}
          px={2}
          border={'1px solid rgba(0, 0, 0, 0.34)'}
          boxShadow={'lg'}
          onClick={generateCSV}
        >
          <Image src="/excell.png" alt="export .csv image" />
          <Text fontSize={{ base: 8, md: 11 }} textAlign="center">
            Export to .csv
          </Text>
        </Flex>
      </Flex>
      <Flex mt={3} flexDirection={'column'} width={'100%'} flex={1}>
        <VStack flexDirection={'column'} spacing={4} mb={2}>
          {_.map(siswas.rows, (siswa, key) => (
            <SiswaCard siswa={siswa} key={key} />
          ))}
        </VStack>
      </Flex>
      <Pagination limit={limit} page={page} setPage={setPage} total={siswas.count} />
    </Flex>
  );
};

const mapStateToProps = (state: RootState) => ({
  siswas: resources.getResource(state, RESOURCE_NAME.SISWAS),
});

const connector = connect(mapStateToProps, {
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(GuruOrangTuaView);
