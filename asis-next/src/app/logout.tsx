'use client';

import Button from '@mui/material/Button';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Logout = () => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    deleteCookie('accessToken');
    router.refresh();
  }, [router]);
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default Logout;
