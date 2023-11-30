import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

function createAxios(requestConfig: RequestConfig): AxiosInstance {
  console.log(baseURL, 'baseURL');
  console.log(`import.meta.env`, import.meta.env);
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
