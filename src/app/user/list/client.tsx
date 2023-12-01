'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { FaUserPlus as AddIcon } from 'react-icons/fa';
import { useCallback } from 'react';
import { addUser } from '@api-client';

const UserAddIcon = () => {
  const router = useRouter();
  const handleAddUser = useCallback(async () => {
    try {
      await addUser({
        address: '영등포',
        age: '2004',
        gender: 'M',
        join_dt: dayjs().toISOString(),
        name: '홍길동',
      });
      alert('유저가 추가되었습니다');
      router.refresh();
    } catch (error) {
      console.log(error);
      alert('유저 추가에 실패햇습니다');
    }
  }, [router]);

  return (
    <button
      className="fixed rounded-full right-2 bottom-14 z-10 bg-white border-solid border-1 w-11 h-11 flex items-center justify-center"
      onClick={handleAddUser}
    >
      <AddIcon size={24} />
    </button>
  );
};

export default UserAddIcon;
