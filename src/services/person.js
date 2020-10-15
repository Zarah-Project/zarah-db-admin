import API from './api';

class Person {
  list = (params, cancelToken) => {
    return API.get('/v1/authority/people/', {params: params, cancelToken: cancelToken});
  };

  read = (recordID) => {
    return API.get(`/v1/authority/people/${recordID}/`);
  };

  create = (formValues) => {
    return API.post(`/v1/authority/people/`, formValues);
  };

  edit = (recordID, formValues) => {
    return API.put(`/v1/authority/people/${recordID}/`, formValues);
  };

  delete = (recordID) => {
    return API.delete(`/v1/authority/people/${recordID}/`);
  };
}

const person = new Person();
export default person;
