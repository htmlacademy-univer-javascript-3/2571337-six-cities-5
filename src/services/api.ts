import axios, { AxiosError } from 'axios';
import { API_TIMEOUT, BASE_SERVER_URL } from '../constants/api';
import { getToken } from './token';
import { processErrorHandler } from './process-error-handle';

type DetailMessageType = {
  errorType: string;
  message: string;
}

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_SERVER_URL,
    timeout: API_TIMEOUT
  });

  api.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers['x-token'] = getToken();
    }
    return config;
  });

  api.interceptors.response.use((response) => response, (error: AxiosError<DetailMessageType>) => {
    if (error.response) {
      const detailMessage = error.response.data;
      processErrorHandler(detailMessage.message);
    }

    throw error;
  });

  return api;
};
