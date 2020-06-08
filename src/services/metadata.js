import API from './api';

class Metadata {
  classifications = (params, cancelToken) => {
    return API.get('/v1/metadata/classifications/', {params: params, cancelToken: cancelToken});
  };

  consents = (params, cancelToken) => {
    return API.get('/v1/metadata/consents/', {cancelToken: cancelToken});
  };

  zotero = (search, cancelToken) => {
    return API.get('/v1/metadata/zotero/', {params: {search: search}, cancelToken: cancelToken});
  }
}

const metadata = new Metadata();
export default metadata;
