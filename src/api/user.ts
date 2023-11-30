import { UserDetailRequest, UserDetailResponse, UserEditRequest, UserListResponse } from '@types';
import axiosClient from './instance';

export const getUserList = async (): Promise<UserListResponse> => {
  const response = await axiosClient.get('/user/list');
  return response.data;
};

export const getUserDetail = async ({ id }: UserDetailRequest): Promise<UserDetailResponse> => {
  const response = await axiosClient.get(`/user/detail?id=${id}`);
  return response.data;
};

export const editUserInfo = async (body: UserEditRequest): Promise<boolean> => {
  await axiosClient.post(`/user/edit`, body);
  return true;
};

export const removeUser = async ({ id }: { id: number }): Promise<boolean> => {
  await axiosClient.post('/user/remove', { id });
  return true;
};
