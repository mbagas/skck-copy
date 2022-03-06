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
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { USER_ROLE } from 'src/utils/constant';

const FormLogin: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const interText = {
    fontFamily: 'Inter',
    fontSize: '0.938rem',
  };

  const generateRole = () =>
    _.map(USER_ROLE, (role, key) => (
      <option key={key} value={role}>
        {_.map(role.split('_'), (r) => _.capitalize(r)).join(' ')}
      </option>
    ));

  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Box
        alignItems="center"
        borderRadius="1.25rem"
        textAlign="center"
        bg="white"
        justifyContent={'center'}
        p={8}
        width="100%"
        mx={5}
      >
        <VStack spacing={5} borderRadius="20px">
          <InputGroup borderColor={'royalRed.300'}>
            <InputLeftElement pointerEvents="none">
              <BiUser color="gray.300" />
            </InputLeftElement>
            <Input id="username" placeholder="Username" boxShadow="lg" />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RiLockPasswordLine color="gray.300" />
            </InputLeftElement>
            <Input
              id="password"
              placeholder="Password"
              size="md"
              borderColor={'royalRed.300'}
              boxShadow="lg"
            />
          </InputGroup>
          <InputGroup>
            <Select
              id="kategori"
              placeholder="-Masuk Sebagai-"
              color={'royalBlack.100'}
              borderColor={'royalRed.300'}
              boxShadow="lg"
            >
              {generateRole()}
            </Select>
          </InputGroup>
          <Box as="button" borderRadius="md" bg={'royalRed.300'} color="white" px={4} h={10}>
            Login
          </Box>

          <Flex justifyContent={'center'} cursor={'pointer'} onClick={onOpen}>
            <Text {...interText} color={'royalRed.300'}>
              Lupa Kata Sandi?
            </Text>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <Divider mt={5} variant={'solid'} />
              <ModalBody>
                <Text textAlign={'center'} {...interText} mt={5} mb={5}>
                  Silahkan datang ke ruang Tata Usaha
                </Text>
              </ModalBody>
              <Divider variant={'solid'} />
              <ModalFooter>
                <Button
                  bg={'royalRed.300'}
                  color={'white'}
                  mr={3}
                  onClick={onClose}
                  _hover={{
                    background: 'royalRed.300',
                    color: 'white',
                  }}
                >
                  Tutup
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      </Box>
    </Flex>
  );
};

export default FormLogin;
