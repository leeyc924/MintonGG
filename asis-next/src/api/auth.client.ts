'use client';

import { AuthLoginRequest, AuthLoginResponse } from '@types';
import { fetchClient } from '@utils-client';

export const authLogin = async ({ id, password }: AuthLoginRequest) => {
  const response = await fetchClient.post<AuthLoginResponse>('/auth/login', {
    cache: 'no-store',
    body: JSON.stringify({ id, password }),
  });

  return response.data;
};
