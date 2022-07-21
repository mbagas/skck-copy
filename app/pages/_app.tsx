import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { Font } from '@react-pdf/renderer';
import moment from 'moment';
import 'moment/locale/id';
import * as FontCollections from 'src/fonts';
import customTheme from 'src/utils/customTheme';
import store from 'src/store';

moment.locale('id');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <ToastContainer />
        <Head>
          <title>Sistem Informasi Pencatatan Pelanggaran</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

Font.register({
  family: 'Times-Roman',
  fonts: [
    { src: FontCollections.Regular },
    {
      src: FontCollections.RegularItalic,
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    { src: FontCollections.Bold, fontWeight: 'bold' },
    {
      src: FontCollections.BoldItalic,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
  ],
});

export default MyApp;
