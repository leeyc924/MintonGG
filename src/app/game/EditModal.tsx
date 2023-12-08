'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { ChangeEventHandler, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Dayjs } from 'dayjs';
import { Typography } from '@mui/material';
import { Tier, UserTierListResponse } from '@types';
import { editTier } from '@api-client';

export interface EditModalProps {
  isOpen: boolean;
  closeModal(): void;
  data: UserTierListResponse;
  date: Dayjs;
}

const EditModal = ({ isOpen, closeModal, data, date }: EditModalProps) => {
  const handleEdit = useCallback(() => {}, []);
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth>
      <DialogTitle>{date.format('YYYY.MM.DD')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display="flex" gap={2} alignItems="center">
            <FormLabel>1부</FormLabel>
            <Box display="flex" gap={1}>
              <Typography>이영철</Typography>
              <Typography>박상훈</Typography>
            </Box>
          </Box>
          <FormLabel>2부</FormLabel>
          <FormLabel>3부</FormLabel>
          <FormLabel>4부</FormLabel>
          <Typography>1부</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>취소</Button>
        <Button onClick={handleEdit}>수정</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
