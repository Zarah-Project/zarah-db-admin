import API from './api';

class Event {
  list = (search, cancelToken) => {
    return API.get('/v1/authority/events/', {params: {search: search}, cancelToken: cancelToken});
  };

  read = (recordID) => {
    return API.get(`/v1/authority/events/${recordID}/`);
  };

  create = (formValues) => {
    return API.post(`/v1/authority/events/`, formValues);
  };

  edit = (recordID, formValues) => {
    return API.put(`/v1/authority/events/${recordID}/`, formValues);
  };

  delete = (recordID) => {
    return API.delete(`/v1/authority/events/${recordID}/`);
  };
}

const event = new Event();
export default event;
