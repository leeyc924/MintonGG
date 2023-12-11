'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import LeftIcon from '@mui/icons-material/ArrowBackIosRounded';
import RightIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useRouter } from 'next/navigation';
import { lunar } from '@utils-client';

export interface GameClientProps {}
interface DateItem {
  year: number;
  month: number;
  day: number;
  week: number;
  dayjs: Dayjs;
  isHoliday: boolean;
  isNone: boolean;
}

const TODAY = dayjs(dayjs().format('YYYY-MM-DD'));

const GameClient = () => {
  const router = useRouter();

  const [currentViewDate, setCurrentViewDate] = useState<Dayjs>(dayjs());
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);

  const dayRowList = useMemo(() => {
    const dateList: DateItem[][] = [[]];
    const startDay = currentViewDate.startOf('month').date();
    const endDay = currentViewDate.endOf('month').date();
    const startWeek = currentViewDate.startOf('month').day();
    const endWeek = currentViewDate.endOf('month').day();
    const currentViewYear = currentViewDate.get('year');
    const currentViewMonth = currentViewDate.get('month');
    let weekIndex = 0;

    // 첫주 시작 요일까지 빈칸
    for (let week = 0; week < startWeek; week++) {
      dateList[weekIndex].push({
        year: 0,
        month: 0,
        day: 0,
        dayjs: dayjs(`0000-00-00`),
        week,
        isHoliday: false,
        isNone: true,
      });
    }

    // 해당 월의 요일
    for (let day = startDay; day <= endDay; day++) {
      let isHoliday = false;
      const year = currentViewYear;
      const month = currentViewMonth + 1;

      if (
        (month === 1 && day === 1) ||
        (month === 3 && day === 1) ||
        (month === 5 && day === 5) ||
        (month === 6 && day === 6) ||
        (month === 8 && day === 15) ||
        (month === 10 && day === 3) ||
        (month === 10 && day === 9) ||
        (month === 12 && day === 25)
      ) {
        isHoliday = true;
      }

      const _lunar = lunar(
        dayjs()
          .year(year)
          .month(month - 1)
          .date(day),
      );

      const lunarMonth = _lunar.dayjs.month() + 1;
      const lunarDay = _lunar.dayjs.date();
      if (
        (lunarMonth === 12 && lunarDay === _lunar.lastDayOfMonth) ||
        (lunarMonth === 1 && lunarDay === 1) ||
        (lunarMonth === 1 && lunarDay === 2) ||
        (lunarMonth === 4 && lunarDay === 8) ||
        (lunarMonth === 8 && lunarDay === 14) ||
        (lunarMonth === 8 && lunarDay === 15) ||
        (lunarMonth === 8 && lunarDay === 16)
      ) {
        isHoliday = true;
      }

      const week = (day - 1 + startWeek) % 7;
      dateList[weekIndex].push({
        year,
        month,
        day,
        dayjs: dayjs(`${year}-${month}-${day}`),
        week,
        isHoliday,
        isNone: false,
      });

      if (week === 6 && day !== endDay) {
        dateList.push([]);
        weekIndex++;
      }
    }

    // 마지막주 토요일까지 빈칸
    for (let week = endWeek + 1; week < 7; week++) {
      dateList[weekIndex].push({
        year: 0,
        month: 0,
        day: 0,
        dayjs: dayjs(`0000-00-00`),
        week,
        isHoliday: false,
        isNone: true,
      });
    }

    return dateList;
  }, [currentViewDate]);

  const handleClickDay = useCallback(
    (dayjs: Dayjs) => {
      if (selectedDay?.isSame(dayjs)) {
        router.push(`/game/detail?playDt=${dayjs.format('YYYY-MM-DD')}`);
        return;
      }

      setSelectedDay(dayjs);
    },
    [router, selectedDay],
  );

  return (
    <Container sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Button onClick={() => setCurrentViewDate(prev => prev.subtract(1, 'month'))}>
          <LeftIcon />
        </Button>
        <Typography>
          {currentViewDate.year()}.{currentViewDate.month() + 1}
        </Typography>
        <Button onClick={() => setCurrentViewDate(prev => prev.add(1, 'month'))}>
          <RightIcon />
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
        }}
      >
        {['일', '월', '화', '수', '목', '금', '토'].map((text, index) => (
          <Typography
            key={text}
            color={index === 0 ? 'red' : index === 6 ? 'blue' : '#333'}
            component="span"
            sx={{ flex: 1, textAlign: 'center', py: 1 }}
          >
            {text}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {dayRowList.map((dayRow, i) => (
          <Box key={i} sx={{ display: 'flex', flex: 1, borderBottom: '1px solid #ddd' }}>
            {dayRow.map((day, j) => (
              <Box
                key={`${i}-${j}`}
                sx={{
                  flex: 1,
                  position: 'relative',
                  p: '4px 8px',
                  borderRight: '1px solid #ddd',
                  borderLeft: j === 0 ? '1px solid #ddd' : 'none',
                  ...(day.isNone && { background: '#eee' }),
                  ...(day.dayjs.isSame(selectedDay) && {
                    boxShadow: '0px 0px 2px 1px blue inset',
                  }),
                }}
                onClick={() => handleClickDay(day.dayjs)}
                component="button"
                disabled={day.isNone}
              >
                <Typography
                  position="absolute"
                  left="8px"
                  top="4px"
                  variant="caption"
                  color={day.isHoliday || day.week === 0 ? 'red' : day.week === 6 ? 'blue' : '#333'}
                  {...(day.dayjs.isSame(TODAY) && { sx: { background: '#333', borderRadius: '4px', color: '#fff' } })}
                >
                  {!day.isNone && day.day}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default GameClient;
