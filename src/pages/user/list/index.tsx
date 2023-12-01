import dayjs from 'dayjs';
import { getUserList } from '@api';
import { Typography } from '@components';
import { useQuery } from '@tanstack/react-query';
import { FailureResponse } from '@types';
import { Link } from 'react-router-dom';

const UserList = () => {
  const { data, isLoading, error } = useQuery<Awaited<ReturnType<typeof getUserList>>, FailureResponse>({
    queryKey: ['users'],
    queryFn: getUserList,
  });

  return (
    <div className="flex-1 flex flex-col">
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
      <div className="flex flex-col w-full">
        {isLoading ? (
          '...loading'
        ) : error ? (
          <Typography fontSize="sm">{error.message}</Typography>
        ) : (
          data?.userList?.map((user, index) => (
            <Link key={user.id} className="flex w-full py-2" to={`/user/detail?id=${user.id}`}>
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
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
