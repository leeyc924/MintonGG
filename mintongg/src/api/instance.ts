import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

function createAxios(requestConfig: AxiosRequestConfig): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: requestConfig.baseURL,
  });

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
const axiosClient = createAxios({ baseURL: import.meta.env.VITE_API_BASE_URL });

export default axiosClient;
