import API from './api';

class Organisation {
  list = (search, cancelToken) => {
    return API.get('/v1/authority/organisations/', {params: {search: search}, cancelToken: cancelToken});
  };

  read = (recordID) => {
    return API.get(`/v1/authority/organisations/${recordID}/`);
  };

  create = (formValues) => {
    return API.post(`/v1/authority/organisations/`, formValues);
  };

  edit = (recordID, formValues) => {
    return API.put(`/v1/authority/organisations/${recordID}/`, formValues);
  };

  selectForms = () => {
    return API.get(`/v1/authority/organisation_forms/`);
  };

  selectFormScales = () => {
    return API.get(`/v1/authority/organisation_form_scales/`);
  };
}

const organisation = new Organisation();
export default organisation;
