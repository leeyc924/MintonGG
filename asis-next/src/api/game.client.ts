import { GameAddRequest, GameRemoveRequest } from '@types';
import { fetchClient } from '@utils-client';

export const upsertGame = async (body: GameAddRequest) => {
  await fetchClient.post<boolean>(`/game/upsert`, { body: JSON.stringify(body) });
  return true;
};

export const removeGame = async (body: GameRemoveRequest) => {
  await fetchClient.post<boolean>(`/game/remove`, { body: JSON.stringify(body) });
  return true;
};
