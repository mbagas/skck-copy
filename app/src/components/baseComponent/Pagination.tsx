import React from 'react';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination: React.FC<Props> = ({ page, limit, total, setPage }) => {
  const maxPage = Math.ceil(total / limit);
  const maxToShow = page * limit;

  return (
    <Flex my={2}>
      <Text>
        Tampilan {total === 0 ? 0 : page === 1 ? 1 : (page - 1) * limit + 1} sampai{' '}
        {maxToShow > total ? total : maxToShow} dari {total}
      </Text>
      <Spacer />
      <Flex
        onClick={() => {
          if (page === 1) return;
          setPage(page - 1);
        }}
        _hover={{
          color: 'royalGray.300',
        }}
      >
        <HiChevronLeft fontSize={20} />
      </Flex>
      <Flex
        onClick={() => {
          if (page === maxPage) return;
          setPage(page + 1);
        }}
        _hover={{
          color: 'royalGray.300',
        }}
      >
        <HiChevronRight fontSize={20} />
      </Flex>
    </Flex>
  );
};

type Props = {
  page: number;
  limit: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default Pagination;
