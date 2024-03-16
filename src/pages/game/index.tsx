import { Calendar, CalendarProps, Typography, palette, useModalManager } from '@breadlee/ui';
import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Icon from '@breadlee/icons';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import Header from '@components/Header';
import { useSession } from '@store';
import Main from '@components/Main';
import { getGameList, getUserList, removeGame } from '@api';
import { User } from '@types';
import * as styles from './index.css';
import GameAddModal from './GameAddModal';

const GameListPage = () => {
  const client = useQueryClient();
  const auth = useSession(state => state.auth);
  const { closeModal, modalOpenId, openModal } = useModalManager({ idList: ['gameAdd'] });
  const [selectedDateList, setSelectedDateList] = useState<Dayjs[]>([dayjs()]);
  const playDt = useMemo(
    () => (selectedDateList.length > 0 ? selectedDateList[0].format('YYYY-MM-DD') : null),
    [selectedDateList],
  );

  const { data } = useQuery({
    queryKey: ['game', playDt],
    queryFn: playDt ? () => getGameList({ playDt }) : undefined,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!playDt,
  });
  const { data: userListData } = useQuery({ queryKey: ['user-list'], queryFn: getUserList, staleTime: 1000 * 60 });
  const removeGameMutaion = useMutation({
    mutationFn: removeGame,
    onSettled: () => client.invalidateQueries({ queryKey: ['game', playDt] }),
  });

  const handleClickDate = useCallback<CalendarProps['onDateClick']>(({ dateList }) => {
    setSelectedDateList(dateList);
  }, []);

  const handleArrowClick = useCallback((dayjsInfo: Dayjs) => {
    setSelectedDateList([dayjsInfo.startOf('month')]);
  }, []);

  const handleRemoveUser = useCallback(
    async (userId: User['id']) => {
      try {
        if (!playDt) {
          return;
        }

        await removeGameMutaion.mutateAsync({
          play_dt: playDt,
          userids: data?.gameList.filter(game => game.id !== userId).map(user => user.id) ?? [],
        });
        toast('삭제 성공', { type: 'success' });
      } catch (error) {
        toast((error as Error).message, { type: 'error' });
      }
    },
    [data?.gameList, playDt, removeGameMutaion],
  );

  return (
    <>
      <Header title="게임 목록" />
      <Main>
        <div className={styles.container}>
          <Calendar
            selectedDateList={selectedDateList}
            onDateClick={handleClickDate}
            onNextClick={handleArrowClick}
            onPrevClick={handleArrowClick}
          />
          {selectedDateList.length > 0 ? (
            <div className={styles.gamelist}>
              <div className={styles.header}>
                <Typography color="onSurface" component="h2" variant="B2">
                  {playDt}
                  {data && data.gameList.length > 0 ? (
                    <Typography color="primary" variant="B2">
                      {' '}
                      {data.gameList.length} 명
                    </Typography>
                  ) : null}
                </Typography>
                {(auth === 'ADMIN' || auth === 'MANAGER') && (
                  <button type="button" onClick={() => openModal('gameAdd')}>
                    <Icon color={palette.onSurface} irName="게임 추가" name="plus" />
                  </button>
                )}
              </div>
              {data && data.gameList.length > 0 ? (
                <div className={styles.body}>
                  {data.gameList.map(game => (
                    <div className={styles.user} key={game.id}>
                      <Typography color="onPrimary" variant="D1">
                        {game.full_name}
                      </Typography>
                      {(auth === 'ADMIN' || auth === 'MANAGER') && (
                        <button type="button" onClick={() => handleRemoveUser(game.id)}>
                          <Icon color={palette.onSecondary} irName="게임 삭제" name="close" size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.empty}>
                  <Typography color="onSurface" variant="D1">
                    진행한 게임이 없습니다
                  </Typography>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.empty}>
              <Typography color="onSurface" variant="D1">
                날짜를 선택해주세요
              </Typography>
            </div>
          )}
        </div>
      </Main>
      {modalOpenId === 'gameAdd' && playDt && (
        <GameAddModal closeModal={closeModal} gameListData={data} playDt={playDt} userListData={userListData} />
      )}
    </>
  );
};

export default GameListPage;
