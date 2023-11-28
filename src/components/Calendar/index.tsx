import { useCallback, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography } from '@components';

const WEEK_TO_KR = ['일', '월', '화', '수', '목', '금', '토'] as const;
const WEEK_TO_DAY = 7;

export interface CalendarProps {
  /** 현재 보여지는 기준 날짜 */
  currentViewDate: Dayjs;
  /**
   * date 클릭 handler
   * @param date 클릭한 날짜 정보
   * */
  onDateClick(date: Dayjs): void;
  /** prev arrow 클릭 handler */
  onPrevClick?(date: Dayjs): void;
  /** next arrow 클릭 handler */
  onNextClick?(date: Dayjs): void;
}

interface DateItem {
  dateInfo: string;
  year: number;
  month: number;
  day: number;
  week: number;
  isNone: boolean;
}

const Calendar = ({ currentViewDate, onDateClick, onNextClick, onPrevClick }: CalendarProps) => {
  const handlePrevClick = useCallback(() => {
    onPrevClick?.(currentViewDate.subtract(1, 'month'));
  }, [currentViewDate, onPrevClick]);

  const handleNextClick = useCallback(() => {
    onPrevClick?.(currentViewDate.add(1, 'month'));
  }, [currentViewDate, onPrevClick]);

  const handleDateClick = useCallback(
    (dateInfo: DateItem) => {
      const dateInfoDayjs = dayjs(dateInfo.dateInfo);
      onDateClick(dateInfoDayjs);
    },
    [onDateClick],
  );

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
        dateInfo: '',
        year: 0,
        month: 0,
        day: 0,
        week,
        isNone: true,
      });
    }

    // 해당 월의 요일
    for (let day = startDay; day <= endDay; day++) {
      const week = (day - 1 + startWeek) % 7;
      const dateInfo = dayjs(`${currentViewYear}-${currentViewMonth + 1}-${day}`).format('YYYY-MM-DD');

      dateList[weekIndex].push({
        dateInfo,
        year: currentViewYear,
        month: currentViewMonth + 1,
        day,
        week,
        isNone: false,
      });
      if (week === 6) {
        dateList.push([]);
        weekIndex++;
      }
    }

    // 마지막 주 토요일까지 빈칸
    for (let week = endWeek + 1; week < WEEK_TO_DAY; week++) {
      dateList[weekIndex].push({
        dateInfo: '',
        year: 0,
        month: 0,
        day: 0,
        week,
        isNone: true,
      });
    }

    return dateList;
  }, [currentViewDate]);

  return (
    <div className="">
      <div className="">
        {!!onPrevClick && <button onClick={handlePrevClick}>{'<'}</button>}
        <Typography variant="H3" weight="bold">
          {currentViewDate.get('year')}년 {currentViewDate.get('month') + 1}월
        </Typography>
        {!!onNextClick && <button onClick={handleNextClick}>{'>'}</button>}
      </div>
      <div role="grid" className="">
        <ul role="row" className="">
          {WEEK_TO_KR.map((text, index) => (
            <li key={index}>
              <Typography variant="D2" color="black" weight="bold" aria-label={text} tabIndex={-1}>
                {text}
              </Typography>
            </li>
          ))}
        </ul>
        <div role="row-group" className="">
          {dayRowList.map((dateList, i) => (
            <ul key={i} role="row" aria-rowindex={i}>
              {dateList.map((dateInfo, j) => (
                <li key={`${i}-${j}-${dateInfo.dateInfo}`} className="">
                  {!dateInfo.isNone && (
                    <button
                      role="gridcell"
                      aria-colindex={j}
                      aria-label={`${dayjs(dateInfo.dateInfo).format('YYYY년 MM월 DD일')} ${
                        WEEK_TO_KR[dateInfo.week]
                      }요일`}
                      onClick={() => handleDateClick(dateInfo)}
                    >
                      <Typography variant="D2" color="blue" weight="bold">
                        {dateInfo.day}
                      </Typography>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
