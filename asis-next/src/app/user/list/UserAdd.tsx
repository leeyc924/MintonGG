'use client';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import UserAddModal from './UserAddModal';

export interface UserAddProps {}

const UserAdd = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', left: '20px', bottom: '75px' }}
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      {isOpen && <UserAddModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default UserAdd;
