'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormEventHandler, useCallback } from 'react';

const LoginForm = () => {
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Code"
        id="email"
        name="email"
        autoFocus
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        로그인
      </Button>
    </Box>
  );
};

export default LoginForm;
