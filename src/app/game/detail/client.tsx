'use client';

import { Box, Container, Fab, IconButton, List, ListItem, ListItemText, Tab, Tabs, TabsOwnProps } from '@mui/material';
import dayjs from 'dayjs';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { GameDetailResponse } from '@types';
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

  const handleChangeTab: TabsOwnProps['onChange'] = useCallback((_: SyntheticEvent, value: number) => {
    setTabValue(value);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

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
          {data.gameList
            .filter(game => game.playPart === tabValue)
            .map(game =>
              game.userList.map(user => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={user.userFullName} />
                </ListItem>
              )),
            )}
        </List>
      </Container>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: '20px', bottom: '75px' }}
        onClick={() => handleOpenModal()}
      >
        <AddIcon />
      </Fab>
      <UserAddModal isOpen={isOpen} onClose={handleCloseModal} userList={data.userList} playDt={playDt} />
    </>
  );
};

export default Client;
