import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

function createAxios(requestConfig: AxiosRequestConfig): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: requestConfig.baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken') ?? '';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const errorData = error.response?.data;
      const status = error.response?.status;
      if (status === 401) {
        window.location.href = '/account/login';
      }
      return Promise.reject(errorData || error);
    },
  );

  return axiosInstance;
}
const axiosClient = createAxios({ baseURL: import.meta.env.VITE_API_BASE_URL });

export default axiosClient;
