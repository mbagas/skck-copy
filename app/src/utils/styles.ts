import { ButtonProps, InputProps } from '@chakra-ui/react';
import { StyleSheet } from '@react-pdf/renderer';

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

export const pdfStyles = StyleSheet.create({
  body: {
    paddingVertical: 60,
    paddingHorizontal: 60,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    margin: 15,
  },
  text: {
    margin: 5,
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
