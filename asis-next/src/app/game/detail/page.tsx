import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getGameDetail } from '@api-server';
import Header from './Header';
import Client from './client';

export interface DetailPageProps {
  searchParams: { playDt: string };
}

const DetailPage = async ({ searchParams: { playDt } }: DetailPageProps) => {
  const data = await getGameDetail({ playDt });
  return <Client data={data} />;
};

export default DetailPage;
