import React from 'react';
import document from '../../services/document';
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond/dist/filepond.min.css";

const FileUpload = ({setFieldValue, ...props}) => {
  registerPlugin(FilePondPluginFileValidateType);

  const baseURL = process.env.REACT_APP_BACKEND_API;

  const handleUpload = (response) => {
    document.store_file(response).then((resp) => {
      const file = resp.data['file'];
      setFieldValue('file_id', response);
      setFieldValue('file_url', `${baseURL}${file}`);
    });
    return response;
  };

  const handleDelete = (response) => {
    setFieldValue('file_id', '');
    setFieldValue('file_url', '');
  };

  return (
    <FilePond
      maxFiles={3}
      allowMultiple={false}
      acceptedFileTypes={['application/pdf']}
      server={{
        process: {
          url: `${baseURL}/fp/process/`,
          onload: handleUpload,
        },
        revert: {
          url: `${baseURL}/v1/document/remove_file/`,
          onload: handleDelete,
        }
      }}
    />
  )
};

export default FileUpload;
