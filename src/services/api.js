import axios from 'axios';
import {useAuthTokenInterceptor} from 'axios-jwt';
import history from '../utils/history'

const baseURL = process.env.REACT_APP_BACKEND_API;

const api = axios.create({
  baseURL: baseURL
});

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

const requestRefresh = (refresh) => {

  return new Promise((resolve, reject) => {
    axios.post( `${baseURL}/auth/jwt/refresh/`, {
      refresh
    }).then(response => {
      resolve(response.data.access);
    }, reject).catch((error) => {
      history.push('/login');
      reject();
    });
  });
};

useAuthTokenInterceptor(api, { requestRefresh });

export default api;
