import { headers } from 'next/headers';
import { UserTierListResponse } from '@types';
import { fetchClient } from '@utils-client';

export const getUserTierList = async () => {
  const response = await fetchClient.get<UserTierListResponse>('/tier/list', { cache: 'no-store' }, headers);
  return response.data;
};
