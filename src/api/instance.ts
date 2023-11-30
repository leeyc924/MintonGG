import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { FailureResponse } from '../types/api';

interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

function createAxios(requestConfig: RequestConfig): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: requestConfig.baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const errorData: FailureResponse = error.response?.data;
      return Promise.reject(errorData || error);
    },
  );

  return axiosInstance;
}

const axiosClient = createAxios({ baseURL });

export default axiosClient;
