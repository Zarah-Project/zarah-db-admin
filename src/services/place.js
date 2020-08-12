import API from './api';

class Place {
  list = (search, cancelToken) => {
    return API.get('/v1/authority/places/', {params: {search: search}, cancelToken: cancelToken});
  };

  read = (recordID) => {
    return API.get(`/v1/authority/places/${recordID}/`);
  };

  create = (formValues) => {
    return API.post(`/v1/authority/places/`, formValues);
  };

  edit = (recordID, formValues) => {
    return API.put(`/v1/authority/places/${recordID}/`, formValues);
  };

  delete = (recordID) => {
    return API.delete(`/v1/authority/places/${recordID}/`);
  };
}

const place = new Place();
export default place;
