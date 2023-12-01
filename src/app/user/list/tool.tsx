'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { FaUserPlus as AddIcon, FaRegCopy as CopyIcon } from 'react-icons/fa';
import { useCallback, useMemo } from 'react';
import { addUser } from '@api-client';
import { UserListResponse } from '@types';
import { Typography } from '@components';

interface ToolProps {
  data: UserListResponse;
}

const Tool = ({ data }: ToolProps) => {
  const router = useRouter();

  const copyUserList = useMemo(
    () =>
      data.userList.reduce((copyText, cur) => {
        const name = `${cur.name}/${cur.age.slice(2, 4)}/${cur.address}/${cur.gender === 'F' ? '여' : '남'}`;
        return copyText + '\n' + name;
      }, ''),
    [data.userList],
  );

  const handleCopyUser = useCallback(async () => {
    await navigator.clipboard.writeText(copyUserList);
    alert('유저목록이 클립보드에 복사되었습니다');
  }, [copyUserList]);

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
    <div className="flex justify-between px-3 py-2 border-b-1 border-solid border-tier-0">
      <div>
        <Typography tag="h1">유저목록</Typography>
      </div>
      <div className="flex ml-auto gap-2">
        <button onClick={handleCopyUser}>
          <CopyIcon size={24} />
        </button>
        <button onClick={handleAddUser}>
          <AddIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default Tool;
