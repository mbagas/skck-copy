import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text, InputGroup, Input, InputRightElement, Select, VStack } from '@chakra-ui/react';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { getAllData as _getAllData } from 'src/store/actions/resources';
import { RESOURCE_NAME } from 'src/utils/constant';
import { Pagination, SiswaCard } from 'src/components/baseComponent';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getSiswaFilter } from 'src/utils/user';
import { FaSearch } from 'react-icons/fa';

const GuruOrangTuaView: React.FC<Props> = ({ siswas, getAllData }) => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.SISWAS, `page=${page}&limit=${limit}`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllData(
        RESOURCE_NAME.SISWAS,
        `page=${page}&limit=${limit}&${getSiswaFilter(searchValue)}`
      );
    },
    1000,
    [searchValue]
  );

  return (
    <Flex width={'100%'} borderRadius={25} p={3} bg="royalWhite.100" flexDirection="column">
      <Flex flexDirection="column">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} p={5} fontWeight="bold">
          Data Siswa
        </Text>
        <Flex mb={4} mt={5} flexDirection="column">
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
      <Flex justifyContent="space-between">
        <Select p={2} width={{ base: '65%', md: '30%' }}>
          <option value="Semua">Semua</option>
          <option value="1">SP 1</option>
          <option value="2">SP 2</option>
          <option value="3">SP 3</option>
        </Select>
      </Flex>
      <Flex mt={3} flexDirection={'column'} width={'100%'}>
        <VStack
          height={{ base: '50vh', md: '42.5vh' }}
          flexDirection={'column'}
          overflow={'auto'}
          spacing={4}
          mb={2}
        >
          {_.map(siswas.rows, (siswa, key) => (
            <SiswaCard siswa={siswa} key={key} />
          ))}
        </VStack>
        <Pagination limit={limit} page={page} setPage={setPage} total={siswas.count} />
      </Flex>
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
