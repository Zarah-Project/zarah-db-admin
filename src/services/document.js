import API from './api';

class Document {
  store_file = (file_id) => {
    return API.post('/v1/document/store_file/', {file: file_id});
  };

  list = (search, cancelToken) => {
    return API.get('/v1/document/', {params: {search: search}, cancelToken: cancelToken});
  };

  read = (recordID) => {
    return API.get(`/v1/document/${recordID}/`);
  };

  create = (formValues) => {
    return API.post(`/v1/document/`, formValues);
  };

  edit = (recordID, formValues) => {
    return API.put(`/v1/document/${recordID}/`, formValues);
  };
}

const document = new Document();
export default document;
