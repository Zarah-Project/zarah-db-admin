import React from 'react';
import document from '../../services/document';
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond/dist/filepond.min.css";
import {getAccessToken} from "axios-jwt";

const FileUpload = ({setFieldValue, ...props}) => {
  registerPlugin(FilePondPluginFileValidateType);

  const baseURL = process.env.REACT_APP_BACKEND_API;

  const handleUpload = (response) => {
    document.store_file(response).then((resp) => {
      const fileID = resp.data['file_id'];
      setFieldValue('file_id', fileID);
      setFieldValue('file_url', `${baseURL}/view_file/${fileID}`);
    });
    return response;
  };

  const handleDelete = (response) => {
    setFieldValue('file_id', undefined);
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
          headers: {
            'authorization': `Bearer ${getAccessToken()}`
          }
        }
      }}
    />
  )
};

export default FileUpload;
