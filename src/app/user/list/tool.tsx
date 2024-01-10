'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import AddIcon from '@mui/icons-material/PersonAddAltRounded';
import TierIcon from '@mui/icons-material/LeaderboardRounded';
import { useCallback, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { addUser } from '@api-client';
import { Session, UserListResponse } from '@types';

interface ToolProps {
  data: UserListResponse;
  session: Session | null;
}

const Tool = ({ data, session }: ToolProps) => {
  const router = useRouter();
  const copyUserList = useMemo(
    () =>
      data.userList.reduce((copyText, cur) => {
        const name = cur['full_name'];
        return copyText + '\n' + name;
      }, ''),
    [data.userList],
  );

  const handleCopyUser = useCallback(async () => {
    await navigator.clipboard.writeText(copyUserList);
  }, [copyUserList]);

  const handleAddUser = useCallback(async () => {
    try {
      await addUser({
        address: '영등포',
        age: '2004',
        gender: 'M',
        join_dt: dayjs().toISOString(),
        name: '홍길동',
      });
      toast('유저가 추가되었습니다', { type: 'success' });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast('유저 추가에 실패햇습니다', { type: 'error' });
    }
  }, [router]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography component="h1">유저목록</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
        {session?.auth === 'ADMIN' && (
          <button onClick={() => router.push('/tier')}>
            <TierIcon />
          </button>
        )}
        <button onClick={handleCopyUser}>
          <CopyIcon />
        </button>
        <button onClick={handleAddUser}>
          <AddIcon />
        </button>
      </Box>
    </Box>
  );
};

export default Tool;
