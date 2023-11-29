import { UserListResponse } from '@types';
import axiosClient from './instance';

export const getUserList = async (): Promise<UserListResponse> => {
  const response = await axiosClient.get('/user/list');
  return response.data;
};
