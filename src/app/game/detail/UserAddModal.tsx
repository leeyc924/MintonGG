import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCallback, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import NativeSelect from '@mui/material/NativeSelect';
import { Modal } from '@components';
import { GameDetailResponse, User } from '@types';
import { upsertGame } from '@api-client';

export interface UserAddModalProps {
  userList: GameDetailResponse['userList'];
  isOpen: boolean;
  onClose(): void;
  playDt: string;
  playPart: number;
  userIdList: User['id'][];
}

const UserAddModal = ({ isOpen, onClose, userList, playDt, playPart, userIdList }: UserAddModalProps) => {
  const router = useRouter();
  const [checkIdList, setCheckIdList] = useState<number[]>(userIdList);
  const [part, setPart] = useState(playPart);

  const handleToggle = (value: number) => () => {
    const currentIndex = checkIdList.indexOf(value);
    const newChecked = [...checkIdList];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckIdList(newChecked);
  };

  const handleSubmit = useCallback(async () => {
    try {
      await upsertGame({ play_dt: playDt, userids: checkIdList, play_part: playPart });
      router.refresh();
      toast('추가 성공', { type: 'success' });
      onClose();
    } catch (error) {
      toast('추가 실패', { type: 'error' });
    }
  }, [checkIdList, onClose, playDt, playPart, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="유저 추가/수정" onSubmit={handleSubmit} submitText="추가">
      <NativeSelect sx={{ width: 70 }} defaultValue={part} onChange={e => setPart(Number(e.target.value))}>
        <option value={1}>1부</option>
        <option value={2}>2부</option>
        <option value={3}>3부</option>
        <option value={4}>4부</option>
      </NativeSelect>
      <List>
        {userList.map(user => (
          <ListItemButton key={user.id} onClick={handleToggle(user.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checkIdList.some(check => check === user.id)}
                disableRipple
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText primary={user.userFullName} />
          </ListItemButton>
        ))}
      </List>
    </Modal>
  );
};

export default UserAddModal;
