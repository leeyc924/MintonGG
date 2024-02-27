import { AuthLoginRequest, AuthLoginResponse } from '@types';
import axiosClient from './instance';

export const authLogin = async ({ id, password }: AuthLoginRequest) => {
  const response = await axiosClient.post<AuthLoginResponse>('/auth/login', {
    body: { id, password },
  });

  return response.data;
};
