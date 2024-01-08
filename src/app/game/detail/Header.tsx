'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LeftIcon from '@mui/icons-material/ArrowBackIosRounded';
import RightIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDate = searchParams.get('playDt') || dayjs().format('YYYY-MM-DD');

  const week = useMemo(() => {
    const engWeek = dayjs(currentDate).format('ddd');
    switch (engWeek) {
      case 'Sun':
        return '일';
      case 'Mon':
        return '월';
      case 'Tue':
        return '화';
      case 'Wed':
        return '수';
      case 'Thu':
        return '목';
      case 'Fri':
        return '금';
      default:
        return '토';
    }
  }, [currentDate]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        onClick={() =>
          router.replace(`/game/detail?playDt=${dayjs(currentDate).subtract(1, 'day').format('YYYY-MM-DD')}`)
        }
      >
        <LeftIcon />
      </Button>
      <Typography>
        {currentDate} {week}
      </Typography>
      <Button
        onClick={() => router.replace(`/game/detail?playDt=${dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD')}`)}
      >
        <RightIcon />
      </Button>
    </Box>
  );
};

export default Header;
