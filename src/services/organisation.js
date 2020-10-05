import API from './api';

class Organisation {
  list = (params, cancelToken) => {
    return API.get('/v1/authority/organisations/', {params: params, cancelToken: cancelToken});
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

  delete = (recordID) => {
    return API.delete(`/v1/authority/organisations/${recordID}/`);
  };

  selectForms = () => {
    return API.get(`/v1/authority/organisation_forms/`);
  };

  selectFormScales = () => {
    return API.get(`/v1/authority/organisation_form_scales/`);
  };

  selectGenderedMemberships = () => {
    return API.get(`/v1/authority/organisation_gendered_memberships/`);
  };
}

const organisation = new Organisation();
export default organisation;
