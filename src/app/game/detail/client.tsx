'use client';

import { Box, Container, Fab, IconButton, List, ListItem, ListItemText, Tab, Tabs, TabsOwnProps } from '@mui/material';
import dayjs from 'dayjs';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { GameDetailResponse } from '@types';
import { removeGame } from '@api-client';
import Header from './Header';
import UserAddModal from './UserAddModal';

export interface ClientProps {
  data: GameDetailResponse;
}

const TabList = [
  { value: 1, label: '1부' },
  { value: 2, label: '2부' },
  { value: 3, label: '3부' },
  { value: 4, label: '4부' },
];

const Client = ({ data }: ClientProps) => {
  const router = useRouter();
  const param = useSearchParams();
  const playDt = param.get('playDt') as string;
  const [tabValue, setTabValue] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const isWeekend = useMemo(() => {
    const day = dayjs(playDt).format('d');
    if (day === '0' || day === '6') {
      return true;
    }

    return false;
  }, [playDt]);

  useEffect(() => {
    setTabValue(isWeekend ? 2 : 4);
  }, [isWeekend]);

  const gameMatchedPlayPart = useMemo(
    () => data.gameList.find(game => game.playPart === tabValue),
    [data.gameList, tabValue],
  );

  const handleChangeTab: TabsOwnProps['onChange'] = useCallback((_: SyntheticEvent, value: number) => {
    setTabValue(value);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleRemoveUser = useCallback(
    async (id: number) => {
      try {
        await removeGame({
          play_dt: playDt,
          play_part: tabValue,
          userids: gameMatchedPlayPart?.userList.filter(user => user.id !== id).map(user => user.id) ?? [],
        });
        router.refresh();
        toast('삭제 성공', { type: 'success' });
      } catch (error) {
        toast((error as Error).message, { type: 'error' });
      }
    },
    [gameMatchedPlayPart?.userList, playDt, router, tabValue],
  );

  return (
    <>
      <Box sx={{ position: 'sticky', top: 0, left: 0, zIndex: 1, background: '#fff', mb: 1 }}>
        <Header />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs value={tabValue} onChange={handleChangeTab}>
            {TabList.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Container>
        <List>
          <ListItem>{gameMatchedPlayPart?.userList.length || '0'} 명</ListItem>
          {gameMatchedPlayPart?.userList.map(user => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveUser(user.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={user.userFullName} />
            </ListItem>
          ))}
        </List>
      </Container>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', left: '20px', bottom: '75px' }}
        onClick={() => handleOpenModal()}
      >
        <AddIcon />
      </Fab>
      {isOpen && (
        <UserAddModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          userList={data.userList}
          playDt={playDt}
          playPart={tabValue}
          userIdList={gameMatchedPlayPart?.userList.map(user => user.id) ?? []}
        />
      )}
    </>
  );
};

export default Client;
