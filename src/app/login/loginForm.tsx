'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { authLogin } from '@api-client';

interface FieldValue {
  id: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FieldValue>();

  const onSubmit = useCallback<SubmitHandler<FieldValue>>(
    async ({ id, password }) => {
      try {
        const { accessToken } = await authLogin({ id, password });
        setCookie('accessToken', accessToken);
        toast('로그인에 성공했습니다', { type: 'success' });
        router.replace('/');
      } catch (error) {
        console.log(`error`, error);
        toast((error as Error).message, { type: 'error' });
      }
    },
    [router],
  );

  const onError = useCallback<SubmitErrorHandler<FieldValue>>(error => {
    if (error.id) {
      toast(error.id.message, { type: 'error' });
      return;
    }

    if (error.password) {
      toast(error.password.message, { type: 'error' });
      return;
    }
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit, onError)} noValidate sx={{ mt: 1 }}>
      <Controller
        control={control}
        name="id"
        rules={{ required: '아이디를 입력해 주세요' }}
        render={({ field: { onChange, value, name, ref } }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="아이디"
            name={name}
            ref={ref}
            autoFocus
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: '패스워드를 입력해 주세요' }}
        render={({ field: { onChange, value, name, ref } }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="패스워드"
            ref={ref}
            name={name}
            type="password"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        로그인
      </Button>
    </Box>
  );
};

export default LoginForm;
