import React, { createRef, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Input,
  Text,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { toastfier } from 'src/utils/toastifier';
import { buttonStyle } from 'src/utils/styles';
import { RoleType } from 'src/utils/interface';
import { bulkCreateUser as _bulkCreateUser } from 'src/store/actions/resources';

const UploadCSV = ({ isOpen, onClose, role, bulkCreateUser }: Props) => {
  const [file, setFile] = useState<File>();
  const fileRef = createRef<HTMLInputElement>();
  const [isUploading, setIsUploading] = useState(false);

  const filePicker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFile(file);
  };

  const onImport = async () => {
    if (!file) {
      toastfier('File CSV dibutuhkan!', {
        type: 'error',
      });

      return;
    }

    setIsUploading(true);

    try {
      await bulkCreateUser(role, file);

      toastfier('Berhasil menambahkan pengguna', { type: 'success' });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch {
      toastfier('Gagal menambahkan pengguna', {
        type: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!isUploading}
      closeOnEsc={!isUploading}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Unggah File CSV</ModalHeader>
        <ModalBody>
          <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
            <Flex
              width={'100%'}
              height={250}
              justifyContent={'center'}
              alignItems={'center'}
              cursor="pointer"
              onClick={() => fileRef.current?.click()}
            >
              {!file && <Text textAlign={'center'}>Pilih file csv</Text>}
              {file && (
                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                  <Image
                    src="/excell.png"
                    alt="import .csv image"
                    width={'50px'}
                    height={'auto'}
                    pb={5}
                  />
                  <Text>{file.name}</Text>
                </Flex>
              )}
            </Flex>
            <Button
              {...buttonStyle.confirmation}
              fontFamily="poppins"
              fontSize={'0.813rem'}
              px={10}
              borderRadius={25}
              _focus={{ border: 'none' }}
              disabled={isUploading}
              onClick={onImport}
            >
              Import
            </Button>
            <Input ref={fileRef} type="file" accept=".csv" display={'none'} onChange={filePicker} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const connector = connect(null, {
  bulkCreateUser: _bulkCreateUser,
});

type Props = ConnectedProps<typeof connector> & {
  isOpen: boolean;
  onClose: () => void;
  role: RoleType;
};

export default connector(UploadCSV);
