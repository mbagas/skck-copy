import { Document, Page, Text } from '@react-pdf/renderer';
import { ISuratPeringatan } from 'src/utils/interface';
import { generateSPDocumentProps, SP_TEXT } from 'src/utils/pdfDocument';
import { pdfStyles as styles } from 'src/utils/styles';
import { KopSurat, Pembuka, Penutup, Signature, SiswaSP } from '../PDFComponent';

const SPDocument = ({ suratPeringatan }: Props) => {
  const spKe = suratPeringatan.history.spKe as keyof typeof SP_TEXT;

  return (
    <Document {...generateSPDocumentProps(suratPeringatan)}>
      <Page size="A4" style={styles.body}>
        <KopSurat />
        <Text style={styles.title}>Surat Peringatan 1</Text>
        <Pembuka type={spKe} />
        <SiswaSP suratPeringatan={suratPeringatan} />
        <Text style={styles.text}>{SP_TEXT[spKe]}</Text>
        <Penutup />
        <Signature suratPeringatan={suratPeringatan} />
      </Page>
    </Document>
  );
};

type Props = {
  suratPeringatan: ISuratPeringatan;
};

export default SPDocument;
