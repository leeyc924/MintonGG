import { UserDetailRequest, UserListResponse } from '@types';
import axiosClient from './instance';

export const getUserList = async (): Promise<UserListResponse> => {
  const response = await axiosClient.get('/user/list');
  return response.data;
};

export const getUserDetail = async ({ id }: UserDetailRequest): Promise<UserListResponse> => {
  const response = await axiosClient.get('/user/detail', { params: id });
  return response.data;
};
