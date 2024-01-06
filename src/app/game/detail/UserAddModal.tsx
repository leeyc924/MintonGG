import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCallback, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { Modal } from '@components';
import { GameDetailResponse } from '@types';

export interface UserAddModalProps {
  userList: GameDetailResponse['userList'];
  isOpen: boolean;
  onClose(): void;
}

const UserAddModal = ({ isOpen, onClose, userList }: UserAddModalProps) => {
  const [checkIdList, setCheckIdList] = useState<number[]>([]);

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

  const handleSubmit = useCallback(() => {
    console.log(checkIdList);
  }, [checkIdList]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="유저추가" onSubmit={handleSubmit} submitText="추가">
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
