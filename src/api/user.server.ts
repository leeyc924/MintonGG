import { headers } from 'next/headers';
import { UserDetailRequest, UserDetailResponse, UserListResponse } from '@types';
import { fetchClient } from '@utils-client';

export const getUserList = async () => {
  const response = await fetchClient.get<UserListResponse>('/user/list', { cache: 'no-store' }, headers);
  return response.data;
};

export const getUserDetail = async ({ id }: UserDetailRequest) => {
  const response = await fetchClient.get<UserDetailResponse>(`/user/detail?id=${id}`, { cache: 'no-store' }, headers);
  return response.data;
};
