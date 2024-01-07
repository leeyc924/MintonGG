import { GameAddRequest } from '@types';
import { fetchClient } from '@utils-client';

export const addGame = async (body: GameAddRequest) => {
  await fetchClient.post<boolean>(`/game/add`, { body: JSON.stringify(body) });
  return true;
};
