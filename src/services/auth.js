import API from './api.js';

class Auth {
  getToken = (formValues) => {
    return API.post('/auth/jwt/create/', formValues);
  };

  getUser = () => {
    return API.get('/auth/users/me/');
  };

  updateUser = (formValues) => {
    return API.put('/auth/users/me/', formValues);
  };

  updatePassword = (formValues) => {
    return API.post('/auth/users/set_password/', formValues)
  };
}

const auth = new Auth();
export default auth;
