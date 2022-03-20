import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import customTheme from 'src/utils/customTheme';
import store from 'src/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <ToastContainer />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
