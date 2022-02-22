import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error.message);
  },
);

export default api;
