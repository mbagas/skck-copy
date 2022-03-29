import React from 'react';
import { GridItem, Checkbox } from '@chakra-ui/react';
import { IKategoriPelanggaran } from 'src/utils/interface';

const ListPelanggaran: React.FC<Props> = ({ kategori }) => {
  return (
    <React.Fragment>
      <GridItem>
        <Checkbox value={kategori.id}>{kategori.namaKategori}</Checkbox>
      </GridItem>
      <GridItem>Poin : {kategori.poin}</GridItem>
    </React.Fragment>
  );
};

type Props = {
  kategori: IKategoriPelanggaran;
};

export default ListPelanggaran;
