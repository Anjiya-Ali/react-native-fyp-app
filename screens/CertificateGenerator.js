// CertificateGenerator.js

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import generateCertificateHTML from './CertificateContent'

const generateCertificatePDF = async (name, instructorName, title, formattedDateStr) => {
  const htmlContent = generateCertificateHTML(name, instructorName, title, formattedDateStr);

  const options = {
    html: htmlContent,
    fileName: `${title}_${name}`,
    directory: 'Documents',
  };

  const file = await RNHTMLtoPDF.convert(options);

  return file.filePath;
};

export default generateCertificatePDF;
