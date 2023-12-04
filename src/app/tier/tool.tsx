'use client';

import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import { useCallback, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserTierListResponse } from '@types';

interface ToolProps {
  data: UserTierListResponse;
}

const Tool = ({ data }: ToolProps) => {
  const copyUserList = useMemo(
    () =>
      data.userList
        .reduce(
          (list, cur) => {
            const tier = cur.tier;
            const name = `${cur.name}/${cur.age.slice(2, 4)}/${cur.address}/${cur.gender === 'F' ? '여' : '남'}`;

            if (tier === 0) {
              list[list.length - 1].push(name);
              return list;
            }

            list[tier - 1].push(name);
            return list;
          },
          [[], [], [], [], [], []] as string[][],
        )
        .reduce((copyText, cur, index, arr) => {
          return (
            copyText +
            '\n' +
            `${index === arr.length - 1 ? '알수없음' : `${index + 1}티어`}` +
            ': ' +
            '\n' +
            cur.join('\n')
          );
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
