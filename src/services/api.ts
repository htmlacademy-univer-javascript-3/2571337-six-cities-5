import axios, { AxiosError } from 'axios';
import { API_TIMEOUT, BASE_SERVER_URL } from '../constants/api';
import { getToken } from './token';
import { showErrorMessage } from '../helpers/error-message';

type DetailMessageType = {
  errorType: string;
  message: string;
}

enum ErrorCode {
  ECONNABORTED = 'ECONNABORTED'
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
    if (error.code === ErrorCode.ECONNABORTED) {
      showErrorMessage('Сервер недоступен');
    }
    if (error.response) {
      throw error.response.data.message;
    }
    throw error;

  });

  return api;
};
