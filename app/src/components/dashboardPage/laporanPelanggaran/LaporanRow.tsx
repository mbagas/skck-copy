import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import _ from 'lodash';
import { Flex, Tr, Td } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { ISiswa, IOrangTua } from 'src/utils/interface';
import { getDataById as _getDataById } from 'src/store/actions/resources';
import { RESOURCE_NAME } from 'src/utils/constant';
import useCustomDebounce from 'src/utils/useCustomDebounce';

const LaporanRow: React.FC<Props> = ({ siswa, index, getDataById }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [orangTua, setOrangTua] = useState<IOrangTua>();

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  useCustomDebounce(
    async () => {
      if (_.isNil(siswa.orangTuaId)) return;

      const data = (await getDataById(
        RESOURCE_NAME.ORANG_TUAS,
        siswa.orangTuaId
      )) as unknown as IOrangTua;
      setOrangTua(data);
    },
    500,
    [isLoaded]
  ); // eslint-disable-line

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
          <FaEdit onClick={() => Router.push(`${Router.pathname}/${siswa.id}`)} />
        </Flex>
      </Td>
    </Tr>
  );
};

const connector = connect(null, {
  getDataById: _getDataById,
});

type Props = ConnectedProps<typeof connector> & {
  siswa: ISiswa;
  index: number;
};

export default connector(LaporanRow);
