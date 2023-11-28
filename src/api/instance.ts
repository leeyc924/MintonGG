import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

const baseURL = 'http://localhost:8005/api';

function createAxios(requestConfig: RequestConfig): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: requestConfig.baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return axiosInstance;
}

const axiosClient = createAxios({ baseURL });

export default axiosClient;
