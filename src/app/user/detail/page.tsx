import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { parseToNumber } from '@utils-client';
import { getUserDetail } from '@api-server';
import Client from './client';

const UserDetailPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const id = parseToNumber(searchParams.id);

  const data = await getUserDetail({ id });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
        <Client data={data} />
      </Box>
    </Container>
  );
};

export default UserDetailPage;
