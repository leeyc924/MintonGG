import { create } from 'zustand';
import { Session } from '@types';

interface Store {
  auth: Session['auth'] | 'NONE';
  setAuth(auth: Session['auth']): void;
}
export const useSession = create<Store>(set => ({
  auth: 'NONE',
  setAuth: auth => set(state => ({ ...state, auth })),
}));
