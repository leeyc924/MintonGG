import { Button, TextField, Typography } from '@breadlee/ui';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '@api';
import * as styles from './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    password: '',
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      const { accessToken } = await authLogin(form);
      localStorage.setItem('accessToken', accessToken);
      toast('로그인에 성공했습니다', { type: 'success' });
      navigate('/', { replace: true });
    } catch (error) {
      toast((error as Error).message, { type: 'error' });
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <Typography color="onSurface" variant="H1">
          Sign in
        </Typography>
      </div>
      <TextField placeholder="아이디*" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
      <TextField
        placeholder="패스워드*"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit">로그인</Button>
    </form>
  );
};

export default LoginPage;
