'use client';

import { useCallback } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { FaUserCircle as ProfileIcon, FaUserEdit as EditIcon } from 'react-icons/fa';
// import { HiUserRemove as RemoveIcon } from 'react-icons/hi';
import { UserDetailResponse } from '@types';
import { editUser, removeUser } from '@api-client';
import { Typography } from '@components';

interface UseDetailClientProps {
  data: UserDetailResponse;
}

const UserDetailPage = ({ data: { userInfo } }: UseDetailClientProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UserDetailResponse['userInfo']>({
    defaultValues: {
      ...userInfo,
      join_dt: dayjs(userInfo.join_dt).format('YYYY.MM.DD'),
    },
  });

  const onSubmit: SubmitHandler<UserDetailResponse['userInfo']> = useCallback(
    async ({ address, age, gender, join_dt, name }) => {
      try {
        if (!userInfo?.id) {
          return;
        }

        await editUser({
          address,
          age,
          gender,
          join_dt,
          name,
          id: userInfo?.id,
        });
        alert('수정 성공');
      } catch (error) {
        console.log(`error`, error);
        alert('수정 실패');
      }
    },
    [userInfo?.id],
  );

  const onError = useCallback<SubmitErrorHandler<UserDetailResponse['userInfo']>>(error => {
    if (error['join_dt']) {
      alert('YYYY.MM.DD 형식으로 입력해주세요');
    }
  }, []);

  const handleRemove = useCallback(async () => {
    try {
      if (!userInfo.id) {
        return;
      }

      await removeUser({ id: userInfo?.id });
      alert('삭제 성공');
      router.push('/user/list');
    } catch (error) {
      console.log(`error`, error);
      alert('삭제 실패');
    }
  }, [router, userInfo?.id]);

  return (
    <div className="flex flex-col h-full">
      <form className="flex flex-col mx-auto h-full w-96 mt-10 gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex mx-auto">
          <ProfileIcon color="#333" size={128} />
        </div>
        <div className="flex flex-col mx-auto">
          <div className="flex gap-2">
            <div className="basis-12 shrink-0">
              <Typography fontSize="base">이름</Typography>
            </div>
            <input className="text-base flex-1" {...register('name', { required: '이름을 입력해 주세요' })} />
          </div>
          <div className="flex gap-2">
            <div className="basis-12 shrink-0">
              <Typography fontSize="base">나이</Typography>
            </div>
            <input className="text-base" {...register('age', { required: '나이를 입력해 주세요', maxLength: 4 })} />
          </div>
          <div className="flex gap-2">
            <div className="basis-12 shrink-0">
              <Typography fontSize="base">지역</Typography>
            </div>
            <input className="text-base" {...register('address', { required: '지역을 입력해 주세요' })} />
          </div>
          <div className="flex gap-2">
            <div className="basis-12 shrink-0">
              <Typography fontSize="base">성별</Typography>
            </div>
            <div className="flex gap-1">
              <Typography fontSize="base">
                남
                <input className="text-base" type="radio" value="M" {...register('gender')} />
              </Typography>
              <Typography fontSize="base">
                여
                <input className="text-base" type="radio" value="F" {...register('gender')} />
              </Typography>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="basis-12 shrink-0">
              <Typography fontSize="base">가입일</Typography>
            </div>
            <input
              className="text-base"
              {...register('join_dt', {
                required: '가입일을 입력해 주세요',
                pattern: /^\d{4}\.\d{2}\.\d{2}$/gi,
              })}
            />
          </div>
          <div className="flex ml-auto">
            <div className="flex gap-1 ml-auto">
              <button type="submit">수정{/* <EditIcon size={24} color="blue" /> */}</button>
              <button type="button" onClick={handleRemove}>
                삭제
                {/* <RemoveIcon size={24} color="red" /> */}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetailPage;
