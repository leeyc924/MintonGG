import {
  GameDetailResponse,
  GameDetailRequest,
  GameListRequest,
  GameListResponse,
  GameAddRequest,
  GameRemoveRequest,
} from '@types';
import axiosClient from './instance';

export const upsertGame = async (body: GameAddRequest) => {
  await axiosClient.post<boolean>(`/game/upsert`, { body });
  return true;
};

export const removeGame = async (body: GameRemoveRequest) => {
  await axiosClient.post<boolean>(`/game/remove`, { body });
  return true;
};

export const getGameList = async ({ month, year }: GameListRequest) => {
  const response = await axiosClient.get<GameListResponse>(`/game/list?year=${year}&month=${month}`);
  return response.data;
};

export const getGameDetail = async ({ playDt }: GameDetailRequest) => {
  const response = await axiosClient.get<GameDetailResponse>(`/game/detail?playDt=${playDt}`);
  return response.data;
};
