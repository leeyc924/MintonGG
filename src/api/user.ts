import { User } from '@types';
import axiosClient from './instance';
import userListJson from './userList.json';

export const getUserList = async (): Promise<User[]> => {
  // const response = await axiosClient.get('/users/list');
  // return response.data;
  return userListJson as User[];
};
