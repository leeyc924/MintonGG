'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import submit from './action';

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(submit, { message: '', result: '' });

  useEffect(() => {
    if (state?.result === 'success') {
      toast('로그인에 성공했습니다', { type: 'success' });
    }

    if (state?.result === 'error') {
      toast(state.message, { type: 'error' });
    }
  }, [router, state?.message, state?.result]);

  return (
    <Box component="form" action={formAction} noValidate sx={{ mt: 1 }}>
      <TextField margin="normal" required fullWidth label="아이디" id="id" name="id" autoFocus />
      <TextField margin="normal" required fullWidth label="패스워드" id="password" name="password" type="password" />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        로그인
      </Button>
    </Box>
  );
};

export default LoginForm;
