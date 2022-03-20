import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  Text,
  useDisclosure,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import _ from 'lodash';

const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const interText = {
    fontFamily: 'Inter',
    fontSize: '0.938rem',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <Divider mt={5} variant={'solid'} />
        <ModalBody>
          <Text textAlign={'center'} {...interText} mt={5} mb={5}>
            Apakah Anda yakin ingin menghapus data ini ?
          </Text>
        </ModalBody>
        <Divider variant={'solid'} />
        <ModalFooter>
          <Button
            bg={'#E1E1E1'}
            color={'white'}
            mr={3}
            onClick={onClose}
            _hover={{
              background: 'royalGray.100',
              color: 'white',
            }}
            px={8}
          >
            Tidak
          </Button>
          <Button
            bg={'royalRed.200'}
            color={'white'}
            onClick={onSubmit}
            _hover={{
              background: 'royalRed.200',
              color: 'white',
            }}
            px={10}
          >
            Ya
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type Props = {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export default DeleteConfirmationModal;
