import React, { useEffect } from 'react';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import useSPGenerator from 'src/utils/useSPGenerator';
import useTopBarHeight from 'src/utils/useTopBarHeight';
import { useMediaQuery } from '@chakra-ui/react';
import SPDocument from './SPDocument';
import { ISuratPeringatan } from 'src/utils/interface';

// Create Document Component
const MyDocument = () => {
  const suratPeringatan = useSPGenerator();
  const decreasor = useTopBarHeight();
  const [isOnBase] = useMediaQuery(['(max-width: 768px)']);

  const renderUrl = (suratPeringatan: ISuratPeringatan): Promise<string> =>
    new Promise(async (resolve) => {
      const blob = await ReactPDF.pdf(<SPDocument suratPeringatan={suratPeringatan} />).toBlob();
      const url = URL.createObjectURL(blob);
      if (url && url.length > 0) {
        resolve(url);
      }
    });

  const generateBlob = async (suratPeringatan: ISuratPeringatan) => {
    const url = await renderUrl(suratPeringatan);

    if (!url) return;

    window.open();
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.style['display'] = 'none';
    aTag.download = `SP - ${suratPeringatan.history.spKe} - ${suratPeringatan.siswa.namaLengkap}.pdf`;
    aTag.click();
  };

  useEffect(() => {
    if (!suratPeringatan) return;

    if (isOnBase) generateBlob(suratPeringatan);
  }, [suratPeringatan]); // eslint-disable-line

  return suratPeringatan ? (
    <PDFViewer style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}>
      <SPDocument suratPeringatan={suratPeringatan} />
    </PDFViewer>
  ) : null;
};

export default MyDocument;
