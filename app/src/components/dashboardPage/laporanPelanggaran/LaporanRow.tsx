import React from 'react';
import Router from 'next/router';
import _ from 'lodash';
import { Flex, Tr, Td } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { ISiswa } from 'src/utils/interface';
import { RESOURCE_NAME } from 'src/utils/constant';
import useGetDataById from 'src/utils/useGetDataById';

const LaporanRow: React.FC<Props> = ({ siswa, index }) => {
  const orangTua = useGetDataById(RESOURCE_NAME.ORANG_TUAS, siswa.orangTuaId);

  return (
    <Tr bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
      <Td>{index + 1}</Td>
      <Td>{siswa.namaLengkap}</Td>
      <Td>{siswa.nis}</Td>
      <Td>{_.get(orangTua, 'namaLengkap', '')}</Td>
      <Td>{_.get(orangTua, 'noTelp', '')}</Td>
      <Td textAlign={'center'}>{_.get(siswa, 'totalPoint', 0)}</Td>
      <Td justifyContent={'center'}>
        <Flex justifyContent={'center'}>
          <FaEdit
            onClick={() => Router.push(`${Router.pathname}/${siswa.id}`)}
            cursor={'pointer'}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

const connector = connect(null, {});

type Props = ConnectedProps<typeof connector> & {
  siswa: ISiswa;
  index: number;
};

export default connector(LaporanRow);
