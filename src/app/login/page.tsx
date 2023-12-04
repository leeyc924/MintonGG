import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginForm from './loginForm';

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon sx={{ color: '#fff' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}
export default LoginPage;
