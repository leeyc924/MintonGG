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
  const data = await getGameDetail({ playDt });
  return (
    <>
      <Header />
      <Container>
        <Box>
          <Box>1부</Box>
          <Box>
            {data.gameList
              .filter(game => game.playPart === 1)
              .map(game => game.userList.map(user => <Box key={user.id}>{user.userFullName}</Box>))}
          </Box>
        </Box>
        <Box>
          <Box>2부</Box>
          <Box>
            {data.gameList
              .filter(game => game.playPart === 2)
              .map(game => game.userList.map(user => <Box key={user.id}>{user.userFullName}</Box>))}
          </Box>
        </Box>
        <Box>
          <Box>3부</Box>
          <Box>
            {data.gameList
              .filter(game => game.playPart === 3)
              .map(game => game.userList.map(user => <Box key={user.id}>{user.userFullName}</Box>))}
          </Box>
        </Box>
        <Box>
          <Box>4부</Box>
          <Box>
            {data.gameList
              .filter(game => game.playPart === 4)
              .map(game => game.userList.map(user => <Box key={user.id}>{user.userFullName}</Box>))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DetailPage;
