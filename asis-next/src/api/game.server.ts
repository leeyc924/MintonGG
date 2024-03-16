import { headers } from 'next/headers';
import { GameDetailResponse, GameDetailRequest, GameListRequest, GameListResponse } from '@types';
import { fetchClient } from '@utils-client';

export const getGameList = async ({ year, month }: GameListRequest) => {
  const response = await fetchClient.get<GameListResponse>(
    `/game/list?year=${year}&month=${month}`,
    { cache: 'no-store' },
    headers,
  );
  return response.data;
};

export const getGameDetail = async ({ playDt }: GameDetailRequest) => {
  const response = await fetchClient.get<GameDetailResponse>(
    `/game/detail?playDt=${playDt}`,
    { cache: 'no-store' },
    headers,
  );
  return response.data;
};
