import React from 'react';
import _ from 'lodash';
import { Checkbox, Flex, GridItem, Text } from '@chakra-ui/react';
import { BiCoinStack } from 'react-icons/bi';
import { IKategoriPelanggaran } from 'src/utils/interface';

const ListPelanggaran: React.FC<Props> = ({ kategori, checked, onChange }) => {
  return (
    <React.Fragment>
      <GridItem>
        <Checkbox
          name={`${kategori.id}`}
          checked={!!_.get(checked, kategori.id)}
          onChange={onChange}
        >
          {kategori.namaKategori}
        </Checkbox>
      </GridItem>
      <GridItem>
        <Flex mr={10} justifyContent={'flex-start'} alignItems={'center'}>
          <Flex>
            <BiCoinStack height={'0.5rem'} />
          </Flex>
          <Text>Point : {_.get(kategori, 'poin', 0)}</Text>
        </Flex>
      </GridItem>
    </React.Fragment>
  );
};

type Props = {
  checked: Record<number, number>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  kategori: IKategoriPelanggaran;
};

export default ListPelanggaran;
