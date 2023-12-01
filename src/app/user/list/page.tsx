import { Suspense } from 'react';
import { Typography } from '@components';
import UserAddIcon from './client';
import UserList from './userList';

const UserListPage = async () => {
  return (
    <div className="relative flex-1 flex flex-col">
      <div className="flex w-full py-2 border-b-1 border-solid">
        <div className="text-center shrink-0 px-2 basis-8">
          <Typography fontSize="sm">no</Typography>
        </div>
        <div className="flex-1 text-center">
          <Typography fontSize="sm">이름</Typography>
        </div>
        <div className="text-center shrink-0 px-2 basis-20">
          <Typography fontSize="sm">가입일</Typography>
        </div>
        <div className="text-center shrink-0 px-2 basis-20">
          <Typography fontSize="sm">최근참여일</Typography>
        </div>
      </div>
      <Suspense fallback={<div>...loading</div>}>
        <UserList />
      </Suspense>
      <UserAddIcon />
    </div>
  );
};

export default UserListPage;
