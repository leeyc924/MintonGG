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
              <TableCell>
                <Typography color="#333">no</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="#333">이름</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="#333">가입일</Typography>
              </TableCell>
              {/* <TableCell>
                <Typography>최근참여일</Typography>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.userList.map((user, index) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography color="#333">{index + 1}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Link href={`/user/detail?id=${user.id}`} prefetch={false}>
                    <Typography color="#333">
                      {user.name}/{user.age.slice(2, 4)}/{user.address}/{user.gender === 'F' ? '여' : '남'}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Typography color="#333">{dayjs(user.join_dt).format('YY.MM.DD')}</Typography>
                </TableCell>
                {/* <TableCell align="right">
                  <Typography>23.11.28</Typography>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserListPage;
