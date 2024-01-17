import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getUserList } from '@api-server';
import { getSession } from '@utils-server';
import Tool from './tool';
import UserAdd from './UserAdd';

const UserListPage = async () => {
  const data = await getUserList();
  const session = getSession();

  return (
    <Container sx={{ py: 2 }}>
      <TableContainer>
        <Tool data={data} session={session} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography fontSize={13} color="#333">
                  no
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={13} color="#333">
                  이름
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={13} color="#333">
                  가입일
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={13} color="#333">
                  최근참여일
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.userList.map((user, index) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography fontSize={13} color="#333">
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Link href={`/user/detail?id=${user.id}`} prefetch={false}>
                    <Typography fontSize={13} color="#333">
                      {user['full_name']}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Typography fontSize={13} color="#333">
                    {dayjs(user.join_dt).format('YY.MM.DD')}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontSize={13} color="#333">
                    {user['play_dt'] ? dayjs(user['play_dt']).format('YY.MM.DD') : '-'}
                    {user['play_count'] !== '0' && (
                      <Typography fontSize={10} color="blue" variant="caption" sx={{ verticalAlign: 'top' }}>
                        {user['play_count']}
                      </Typography>
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {session?.auth !== 'USER' && <UserAdd />}
    </Container>
  );
};

export default UserListPage;
