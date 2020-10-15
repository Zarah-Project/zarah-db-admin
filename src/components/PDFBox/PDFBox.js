import React, {useEffect, useState} from "react";
import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import document from "../../services/document";

const PDFBox = ({fileID, ...props}) => {
  const [fileURL, setFileURL] = useState(undefined);

  useEffect(() => {
    if (fileID) {
      document.read_file(fileID).then((response) => {
        setFileURL(URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'})));
      });
    } else {
      setFileURL(undefined);
    }
  }, [fileID]);

  return (
    fileURL ?
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
      <div style={{ height: '820px', marginBottom: '20px' }}>
        <Viewer fileUrl={fileURL}/>
      </div>
    </Worker> : ''
  )
};

export default PDFBox;
