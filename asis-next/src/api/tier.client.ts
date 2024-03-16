'use client';
import { UserTierEditRequest } from '@types';
import { fetchClient } from '@utils-client';

export const editTier = async (body: UserTierEditRequest) => {
  const response = await fetchClient.post('/tier/edit', { body: JSON.stringify(body) });
  return response.data;
};
