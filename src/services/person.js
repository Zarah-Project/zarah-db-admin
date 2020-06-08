import API from './api';

class Person {
  list = (search, cancelToken) => {
    return API.get('/v1/authority/people/', {params: {search: search}, cancelToken: cancelToken});
  };

  read = (recordID) => {
    return API.get(`/v1/authority/people/${recordID}/`);
  };

  create = (formValues) => {
    return API.post(`/v1/authority/people/`, formValues);
  };

  edit = (recordID, formValues) => {
    return API.put(`/v1/authority/people/${recordID}/`, formValues);
  }
}

const person = new Person();
export default person;
