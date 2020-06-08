import React from "react";
import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

const PDFBox = ({url, ...props}) => {
  return (
    url ?
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.worker.min.js">
      <div style={{ height: '820px', marginBottom: '20px' }}>
        <Viewer fileUrl={url} />
      </div>
    </Worker> : ''
  )
};

export default PDFBox;
