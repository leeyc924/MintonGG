'use client';

import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import { useCallback, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Session, UserListResponse } from '@types';

interface ToolProps {
  data: UserListResponse;
  session: Session | null;
}

const Tool = ({ data }: ToolProps) => {
  const copyUserList = useMemo(
    () =>
      data.userList.reduce((copyText, cur) => {
        const name = `${cur.name}/${cur.age.slice(2, 4)}/${cur.address}/${cur.gender === 'F' ? '여' : '남'}`;
        return copyText + '\n' + name;
      }, ''),
    [data.userList],
  );

  const handleCopyUser = useCallback(async () => {
    await navigator.clipboard.writeText(copyUserList);
  }, [copyUserList]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography component="h1">티어목록</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
        <button onClick={handleCopyUser}>
          <CopyIcon />
        </button>
      </Box>
    </Box>
  );
};

export default Tool;
