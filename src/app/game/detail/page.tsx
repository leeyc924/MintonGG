import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { getGameDetail } from '@api-server';
import Header from './Header';

export interface DetailPageProps {
  searchParams: { playDt: string };
}

const DetailPage = async ({ searchParams: { playDt } }: DetailPageProps) => {
  const gameDetail = await getGameDetail({ playDt });

  return (
    <>
      <Header />
      <Container>
        <Box>1부</Box>
        <Box>2부</Box>
        <Box>3부</Box>
        <Box>4부</Box>
      </Container>
    </>
  );
};

export default DetailPage;
