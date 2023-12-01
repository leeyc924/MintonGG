import { Suspense } from 'react';
import { Typography } from '@components';
import { getUserList } from '@api-server';
import UserAddIcon from './tool';
import UserList from './userList';
import Tool from './tool';

const UserListPage = async () => {
  const data = await getUserList();
  return (
    <div className="relative flex-1 flex flex-col">
      <div>
        <Tool data={data} />
      </div>
      <div className="flex w-full py-2 border-b-1 border-solid px-3">
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
      <UserList data={data} />
    </div>
  );
};

export default UserListPage;
