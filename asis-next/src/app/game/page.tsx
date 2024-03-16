import dayjs from 'dayjs';
import { getGameList } from '@api-server';
import Client from './client';

const GamePage = async ({ searchParams: { date } }: { searchParams: { date: string } }) => {
  const [year, month] = (date ?? dayjs().format('YYYY-MM')).split('-');
  const data = await getGameList({ year, month });
  return <Client data={data} />;
};

export default GamePage;
