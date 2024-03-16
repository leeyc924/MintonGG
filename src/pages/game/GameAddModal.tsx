import { BottomSheet, CheckBox } from '@breadlee/ui';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameListResponse, User, UserListResponse } from '@types';
import { upsertGame } from '@api';
import * as styles from './index.css';

export interface GameAddModalProps {
  closeModal(): void;
  userListData?: UserListResponse;
  gameListData?: GameListResponse;
  playDt: string;
}

const GameAddModal = ({ closeModal, gameListData, playDt, userListData }: GameAddModalProps) => {
  const client = useQueryClient();
  const upserGameMutation = useMutation({
    mutationFn: upsertGame,
    onSettled: () => client.invalidateQueries({ queryKey: ['game', playDt] }),
  });

  const [selectedUserIdList, setSelectedUserIdList] = useState(gameListData?.gameList.map(game => game.id) || []);

  const onSubmit = useCallback(async () => {
    try {
      await upserGameMutation.mutateAsync({ play_dt: playDt, userids: selectedUserIdList });
      toast('추가 성공', { type: 'success' });
      closeModal();
    } catch (error) {
      toast('추가 실패', { type: 'error' });
    }
  }, [closeModal, playDt, selectedUserIdList, upserGameMutation]);

  const handleCheck = useCallback(
    (userId: User['id']) => {
      const isSame = selectedUserIdList.some(selected => selected === userId);
      setSelectedUserIdList(prev => (isSame ? prev.filter(p => p !== userId) : prev.concat(userId)));
    },
    [selectedUserIdList],
  );

  return (
    <BottomSheet
      cancelText="닫기"
      submitText="추가"
      title="신규회원"
      isOpen
      onCancel={closeModal}
      onClose={closeModal}
      onSubmit={onSubmit}
    >
      <div className={styles.modal}>
        {userListData?.userList.map(user => (
          <div key={user.id}>
            <CheckBox
              checked={selectedUserIdList.some(selected => selected === user.id)}
              label={user.full_name}
              onChange={() => handleCheck(user.id)}
            />
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

export default GameAddModal;
