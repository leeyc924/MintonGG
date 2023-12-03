import { headers } from 'next/headers';
import { Session } from '@types';

export const getSession = () => {
  const headersList = headers();
  const session = headersList.get('session');

  if (!session) {
    return null;
  }

  return JSON.parse(decodeURIComponent(headersList.get('session') as string)) as Session;
};
