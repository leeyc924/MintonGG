import { AuthLoginRequest, AuthLoginResponse } from '@types';
import axiosClient from './instance';

export const authLogin = async ({ id, password }: AuthLoginRequest) => {
  const response = await axiosClient.post<AuthLoginResponse>('/auth/login', { id, password });

  return response.data;
};

export const authCheck = async () => {
  const response = await axiosClient.post('/auth/check');

  return response.data;
};
