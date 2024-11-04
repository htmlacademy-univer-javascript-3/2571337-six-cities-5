import axios from 'axios';
import { API_TIMEOUT, BASE_SERVER_URL } from '../constants/api';

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_SERVER_URL,
    timeout: API_TIMEOUT
  });

  api.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers['x-token'] = 'token';
    }
    return config;
  });
  return api;
};
