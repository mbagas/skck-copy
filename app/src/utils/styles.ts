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
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  cops: { flexDirection: 'row' },
  cops_inner: { justifyContent: 'center', alignItems: 'center' },
  cops_text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
  cops_title: {
    fontSize: 15,
    fontFamily: 'Times-Roman',
    justifyContent: 'center',
  },
  cops_title_italic: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    margin: 15,
  },
  text: {
    margin: 5,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  text_right: {
    margin: 10,
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
  },
  logo: {
    height: '70%',
    width: '10%',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  ttd: {
    height: '100%',
    width: '20%',
    backgroundColor: 'red',
  },

  image: {
    height: '70%',
    width: '10%',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },

  borderThin: {
    marginTop: 5,
    marginBottom: 1,
    marginLeft: 20,
    display: 'flex',
    height: 2,
    width: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  borderThicc: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 20,
    display: 'flex',
    height: 5,
    width: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
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
  signature: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
