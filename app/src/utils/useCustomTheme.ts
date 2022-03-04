import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
    royalBlue: {
      100: '#4F72D9',
      200: '#184ADE',
    },
    TextLogin: {
      SMA: '#F3EF24',
    },
  },
});

export default theme;
