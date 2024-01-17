'use client';

import { useRouter } from 'next/navigation';
import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import TierIcon from '@mui/icons-material/LeaderboardRounded';
import { useCallback, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
      </Box>
    </Box>
  );
};

export default Tool;
