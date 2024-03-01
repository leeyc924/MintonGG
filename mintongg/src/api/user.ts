import { UserAddRequest, UserDetailRequest, UserDetailResponse, UserEditRequest, UserListResponse } from '@types';
import axiosClient from './instance';

export const getUserList = async () => {
  const response = await axiosClient.get<UserListResponse>('/user/list');
  return response.data;
};

export const getUserDetail = async ({ id }: UserDetailRequest) => {
  const response = await axiosClient.get<UserDetailResponse>(`/user/detail?id=${id}`);
  return response.data;
};

export const addUser = async (body: UserAddRequest) => {
  await axiosClient.post<boolean>(`/user/add`, body);
  return true;
};

export const editUser = async (body: UserEditRequest) => {
  const response = await axiosClient.post('/user/edit', { body });
  return response.data;
};

export const removeUser = async (body: { id: number }) => {
  const response = await axiosClient.post('/user/remove', { body });
  return response.data;
};
