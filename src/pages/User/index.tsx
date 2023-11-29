import { useQuery } from '@tanstack/react-query';
import { getUserList } from '@api';
import dayjs from 'dayjs';
import { Typography } from '@components';

const User = () => {
  const { data, isLoading } = useQuery<Awaited<ReturnType<typeof getUserList>>, any>({
    queryKey: ['users'],
    queryFn: getUserList,
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex w-full py-2 border-b-1 border-solid">
        <div className="text-center shrink-0 px-2">
          <Typography fontSize="sm">no</Typography>
        </div>
        <div className="flex-1 text-center">
          <Typography fontSize="sm">이름</Typography>
        </div>
        <div className="text-center shrink-0 px-2">
          <Typography fontSize="sm">가입일</Typography>
        </div>
        <div className="text-center shrink-0 px-2">
          <Typography fontSize="sm">최근참여일</Typography>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {/* <div className="flex w-full py-2 card">
          <div className="text-center shrink-0 px-2">
            <Typography fontSize="sm">1</Typography>
          </div>
          <div className="flex-1 text-center">
            <div className="flex text-sm gap-1">
              <input value={'박상훈'} className="w-16 border-1 border-solid" />
              <input
                value={'1997'}
                className="w-16 border-1 border-solid"
                type="number"
                min="1900"
                max="2099"
                step="1"
              />
              <input value={'영등포'} className="w-16 border-1 border-solid" />
            </div>
          </div>
          <div className="text-center shrink-0 px-2">
            <div className="text-sm">
              <input value="2023-11-26" type="date" />
            </div>
          </div>
          <div className="text-center shrink-0 px-2">
            <div className="text-sm">
              <Typography>23.11.28</Typography>
            </div>
          </div>
        </div> */}
        {isLoading
          ? '...loading'
          : data?.userList.map((user, index) => (
              <div key={user.id} className="flex w-full py-2 card">
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
              </div>
            ))}
      </div>
    </div>
  );
};

export default User;
