import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import AkunTableContainer from '../akunPage/AkunTableContainer';
import { RESOURCE_NAME } from 'src/utils/constant';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { getAllData as _getAllData } from 'src/store/actions/resources';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getSiswaFilter } from 'src/utils/user';
import LaporanRow from './LaporanRow';

const LaporanContent: React.FC<Props> = ({ siswas, getAllData }) => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.SISWAS, `page=${page}&limit=15`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllData(
        RESOURCE_NAME.SISWAS,
        `page=${page}&limit=15&${getSiswaFilter(searchValue)}`
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
          Buat Laporan
        </Text>
        <AkunTableContainer>
          <Flex mb={4} mt={8} justifyContent={'flex-end'} alignItems="center">
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
                <Th color="white" bg={'royalRed.200'} width={'25%'}>
                  Nama
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'10%'}>
                  NIS
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'25%'}>
                  Nama Orang Tua
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'30%'}>
                  No. Telepon Orang Tua
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'10%'} textAlign="center">
                  Poin
                </Th>
                <Th color="white" bg={'royalRed.200'} textAlign="center" borderTopRightRadius={10}>
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(_.toArray(siswas.rows), (siswa, index) => (
                <LaporanRow siswa={siswa} index={index} key={index} />
              ))}
            </Tbody>
          </Table>
        </AkunTableContainer>
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  siswas: resources.getResource(state, RESOURCE_NAME.SISWAS),
});

const connector = connect(mapStateToProps, {
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(LaporanContent);
