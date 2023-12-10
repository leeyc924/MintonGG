import { headers } from 'next/headers';
import { GameDetailResponse, GameDetailRequest } from '@types';
import { fetchClient } from '@utils-client';

export const getGameDetail = async ({ playDt }: GameDetailRequest) => {
  const response = await fetchClient.get<GameDetailResponse>(
    `/game/detail?playDt=${playDt}`,
    { cache: 'no-store' },
    headers,
  );
  return response.data;
};
