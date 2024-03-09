import { BestUserListResponse, NewUserListResponse } from '@types';
import axiosClient from './instance';

export const getNewUserList = async () => {
  const response = await axiosClient.get<NewUserListResponse>('/home/new-user');
  return response.data;
};
export const getBestUser = async () => {
  const response = await axiosClient.get<BestUserListResponse>('/home/best-user');
  return response.data;
};
