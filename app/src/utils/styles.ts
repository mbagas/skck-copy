import { ButtonProps, InputProps } from '@chakra-ui/react';

const createDefaultInput = {
  borderRadius: 0,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
};

export const createUserInput: InputProps = {
  borderRadius: 0,
  borderBottom: '1px solid black',
  borderColor: 'transparent',
  _hover: {
    ...createDefaultInput,
    borderBottom: '1px solid black',
  },
  _invalid: {
    ...createDefaultInput,
    borderBottom: '1px solid red',
  },
  _focus: {
    ...createDefaultInput,
  },
  _pressed: { ...createDefaultInput },
  outline: 'none',
};

export const buttonStyle = {
  confirmation: {
    bg: 'royalRed.200',
    color: 'white',
    _hover: {
      background: 'royalRed.200',
      color: 'white',
    },
  } as ButtonProps,
};
