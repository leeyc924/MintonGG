'use client';

import { UserAddRequest, UserEditRequest } from '@types';
import { fetchClient } from '@utils';

export const addUser = async (body: UserAddRequest) => {
  await fetchClient.post<boolean>(`/user/add`, { body: JSON.stringify(body) });
  return true;
};

export const editUser = async (body: UserEditRequest) => {
  const response = await fetchClient.post(`/user/edit`, { body: JSON.stringify(body) });
  console.log(`response `, response);
  return response.data;
};

export const removeUser = async ({ id }: { id: number }) => {
  await fetchClient.post('/user/remove', { body: JSON.stringify(id) });
  return true;
};
