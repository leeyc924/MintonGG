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
import { Tier, UserTierListResponse } from '@types';
import { editTier } from '@api-client';

export interface EditModalProps {
  isOpen: boolean;
  closeModal(): void;
  data: UserTierListResponse;
}

const EditModal = ({ isOpen, closeModal, data }: EditModalProps) => {
  const [userId, setUserId] = useState(data.userList[0].id);
  const [tier, setTier] = useState(data.userList[0].tier);
  const router = useRouter();

  const handleEditTier = useCallback(async () => {
    try {
      await editTier({ id: userId, tier });
      router.refresh();
      toast('티어를 수정하였습니다', { type: 'success' });
      closeModal();
    } catch (error) {
      console.log(error);
      toast('티어 수정에 실패하였습니다', { type: 'error' });
    }
  }, [closeModal, router, tier, userId]);

  const handleChangeName = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    e => {
      const id = Number(e.target.value);
      setUserId(id);
      setTier(data.userList.find(user => user.id === id)?.tier || 0);
    },
    [data.userList],
  );

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth>
      <DialogTitle>티어 수정</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormLabel>이름</FormLabel>
            <NativeSelect value={userId} onChange={handleChangeName}>
              {data.userList.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}/{user.age.slice(2, 4)}/{user.address}/{user.gender === 'F' ? '여' : '남'}
                </option>
              ))}
            </NativeSelect>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormLabel>티어</FormLabel>
            <NativeSelect value={tier} onChange={e => setTier(Number(e.target.value) as Tier)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={0}>?</option>
            </NativeSelect>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>취소</Button>
        <Button onClick={handleEditTier}>수정</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
