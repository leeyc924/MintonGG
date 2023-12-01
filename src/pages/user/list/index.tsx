import { useCallback } from 'react';
import dayjs from 'dayjs';
import { addUser, getUserList } from '@api';
import { Typography } from '@components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FailureResponse } from '@types';
import { Link } from 'react-router-dom';
import { FaUserPlus as AddIcon } from 'react-icons/fa';

const UserList = () => {
  const { data, isLoading, error } = useQuery<Awaited<ReturnType<typeof getUserList>>, FailureResponse>({
    queryKey: ['users'],
    queryFn: getUserList,
    retry: false,
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({ mutationFn: addUser });
  const handleAddUser = useCallback(async () => {
    try {
      await mutateAsync({
        address: '영등포',
        age: '2004',
        gender: 'M',
        join_dt: dayjs().toISOString(),
        name: '홍길동',
      });
      await queryClient.refetchQueries({ queryKey: ['users'], type: 'active' });

      alert('유저가 추가되었습니다');
    } catch (error) {
      console.log(error);
      alert('유저 추가에 실패햇습니다');
    }
  }, [mutateAsync, queryClient]);

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
      <button
        className="fixed rounded-full right-2 bottom-14 z-10 bg-white border-solid border-1 w-11 h-11 flex items-center justify-center"
        onClick={handleAddUser}
      >
        <AddIcon size={24} />
      </button>
      {isPending && <div className="fixed z-30 bg-tier-0 left-0 bottom-0"></div>}
    </div>
  );
};

export default UserList;
