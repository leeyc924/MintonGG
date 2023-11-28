import { useQuery } from '@tanstack/react-query';
import { getUserList } from '@api';
import dayjs from 'dayjs';
import { Typography } from '@components';

const User = () => {
  const { data, isLoading } = useQuery<Awaited<ReturnType<typeof getUserList>>, any>({
    queryKey: ['users'],
    queryFn: getUserList,
  });
  return isLoading ? (
    '...loading'
  ) : (
    <div className="flex-1 flex flex-col">
      <div className="flex w-full py-2 border-b-1 border-solid">
        <div className="text-center shrink-0 px-2">
          <Typography>no</Typography>
        </div>
        <div className="flex-1 text-center">
          <Typography>이름</Typography>
        </div>
        <div className="text-center shrink-0 px-2">
          <Typography>가입일</Typography>
        </div>
        <div className="text-center shrink-0 px-2">
          <Typography>최근참여일</Typography>
        </div>
        <div className="text-center shrink-0 px-2">
          <Typography>경고</Typography>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {data?.map((user, index) => (
          <div key={user.id} className="flex w-full py-2">
            <div className="text-center shrink-0 px-2">
              <Typography>{index + 1}</Typography>
            </div>
            <div className="flex-1 text-center">
              <Typography>
                {user.name}/{user.age.slice(2, 4)}/{user.address}
              </Typography>
            </div>
            <div className="text-center shrink-0 px-2">
              <Typography>{dayjs(user.join_dt).format('YY.MM.DD')}</Typography>
            </div>
            <div className="text-center shrink-0 px-2">
              <Typography>23.11.28</Typography>
            </div>
            <div className="text-center shrink-0 px-2">
              <Typography>0</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
