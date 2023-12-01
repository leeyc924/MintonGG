import dayjs from 'dayjs';
import Link from 'next/link';
import { Typography } from '@components';
import { UserListResponse } from '@types';

interface UserListProps {
  data: UserListResponse;
}

const UserList = async ({ data }: UserListProps) => {
  return (
    <div className="flex flex-col w-full px-3">
      {data.userList.map((user, index) => (
        <Link key={user.id} className="flex w-full py-2" href={`/user/detail?id=${user.id}`} prefetch={false}>
          <div className="text-center shrink-0 px-2 basis-8">
            <Typography>{index + 1}</Typography>
          </div>
          <div className="flex-1 text-center">
            <Typography>
              {user.name}/{user.age.slice(2, 4)}/{user.address}/{user.gender === 'F' ? '여' : '남'}
            </Typography>
          </div>
          <div className="text-center shrink-0 px-2 basis-20">
            <Typography>{dayjs(user.join_dt).format('YY.MM.DD')}</Typography>
          </div>
          <div className="text-center shrink-0 px-2 basis-20">
            <Typography>23.11.28</Typography>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
