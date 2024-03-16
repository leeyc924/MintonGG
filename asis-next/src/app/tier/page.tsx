import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Badge from '@mui/material/Badge';
import { getUserTierList } from '@api-server';
import Tool from './tool';
import './page.css';

const TierPage = async () => {
  const data = await getUserTierList();

  return (
    <Container sx={{ py: 2 }}>
      <TableContainer>
        <Tool data={data} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography color="#333">티어</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="#333">이름</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.userList.map(user => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center" sx={{ position: 'relative' }}>
                  <Badge
                    badgeContent="1"
                    variant="dot"
                    color="success"
                    className={`dot-${user.tier}`}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <Typography color="#333">{!user.tier ? '?' : user.tier}</Typography>
                  </Badge>
                </TableCell>
                <TableCell align="center">
                  <Typography color="#333">
                    {user.name}/{user.age.slice(2, 4)}/{user.address}/{user.gender === 'F' ? '여' : '남'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

{
  /* <NativeSelect
defaultValue={30}
>
<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
<option value={4}>4</option>
<option value={5}>5</option>
<option value={0}>?</option>
</NativeSelect> */
}

export default TierPage;
