'use client';

import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import { useCallback, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserTierListResponse } from '@types';
import EditModal from './EditModal';

interface ToolProps {
  data: UserTierListResponse;
}

const Tool = ({ data }: ToolProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
            '\n\n' +
            `${index === arr.length - 1 ? '알수없음' : `${index + 1}티어`}` +
            ':' +
            '\n' +
            cur.join('\n')
          );
        }, ''),
    [data.userList],
  );

  const handleCopyTier = useCallback(async () => {
    await navigator.clipboard.writeText(copyUserList);
  }, [copyUserList]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography component="h1">티어목록</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
        <button onClick={() => setIsOpen(true)}>
          <EditIcon />
        </button>
        <button onClick={handleCopyTier}>
          <CopyIcon />
        </button>
      </Box>
      {isOpen && <EditModal data={data} isOpen={isOpen} closeModal={() => setIsOpen(false)} />}
    </Box>
  );
};

export default Tool;
