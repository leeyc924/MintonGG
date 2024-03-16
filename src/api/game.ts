import { stringifyQuery } from '@breadlee/utils';
import { GameListRequest, GameListResponse, GameAddRequest, GameRemoveRequest } from '@types';
import axiosClient from './instance';

export const getGameList = async ({ playDt }: GameListRequest) => {
  const response = await axiosClient.get<GameListResponse>(`/game/list${stringifyQuery({ playDt })}`);
  return response.data;
};

export const upsertGame = async (body: GameAddRequest) => {
  await axiosClient.post<boolean>(`/game/upsert`, body);
  return true;
};

export const removeGame = async (body: GameRemoveRequest) => {
  await axiosClient.post<boolean>(`/game/remove`, body);
  return true;
};
