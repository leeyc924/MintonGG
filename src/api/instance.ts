import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

const baseURL = import.meta.env.BASE_URL;

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
