import React from 'react';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { buttonStyle } from 'src/utils/styles';

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
          <Button {...buttonStyle.confirmation} onClick={onSubmit} px={10}>
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
