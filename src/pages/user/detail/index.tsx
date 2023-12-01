import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { editUserInfo, removeUser, getUserDetail } from '@api';
import { FailureResponse, UserDetailResponse } from '@types';
import { Loading } from '@components';
import { parseToNumber } from '@utils';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = useMemo(() => parseToNumber(searchParams.get('id')), [searchParams]);

  const { data, isLoading, error, isSuccess, isError } = useQuery<
    Awaited<ReturnType<typeof getUserDetail>>,
    FailureResponse
  >({
    queryKey: ['users', id],
    queryFn: () => getUserDetail({ id }),
    retry: false,
  });

  const { register, handleSubmit, setValue } = useForm<UserDetailResponse['userInfo']>();

  useEffect(() => {
    if (!data?.userInfo) {
      return;
    }

    setValue('name', data.userInfo.name);
    setValue('age', data.userInfo.age);
    setValue('address', data.userInfo.address);
    setValue('gender', data.userInfo.gender);
    setValue('join_dt', dayjs(data.userInfo.join_dt).format('YYYY.MM.DD'));
  }, [data?.userInfo, setValue]);

  useEffect(() => {
    if (isError && error) {
      alert('유저 정보가 없습니다');
      navigate('/user');
    }
  }, [error, isError, navigate]);

  const onSubmit: SubmitHandler<UserDetailResponse['userInfo']> = useCallback(
    async ({ address, age, gender, join_dt, name }) => {
      try {
        if (!data?.userInfo?.id) {
          return;
        }

        await editUserInfo({
          address,
          age,
          gender,
          join_dt,
          name,
          id: data?.userInfo?.id,
        });
        alert('수정 성공');
      } catch (error) {
        console.log(`error`, error);
        alert('수정 실패');
      }
    },
    [data?.userInfo?.id],
  );

  const onError = useCallback<SubmitErrorHandler<UserDetailResponse['userInfo']>>(error => {
    if (error['join_dt']) {
      alert('YYYY.MM.DD 형식으로 입력해주세요');
    }
  }, []);

  const handleRemove = useCallback(async () => {
    try {
      if (!data?.userInfo.id) {
        return;
      }

      await removeUser({ id: data?.userInfo?.id });
      alert('삭제 성공');
      navigate('/user');
    } catch (error) {
      console.log(`error`, error);
      alert('삭제 실패');
    }
  }, [data?.userInfo?.id, navigate]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex gap-2">
            <label htmlFor="name">이름</label>
            <input id="name" {...register('name', { required: '이름을 입력해 주세요' })} />
          </div>
          <div className="flex gap-2">
            <label htmlFor="age">나이</label>
            <input id="age" {...register('age', { required: '나이를 입력해 주세요', maxLength: 4 })} />
          </div>
          <div className="flex gap-2">
            <label htmlFor="address">지역</label>
            <input id="address" {...register('address', { required: '지역을 입력해 주세요' })} />
          </div>
          <div className="flex gap-2">
            <label>성별</label>
            <label>
              남
              <input type="radio" value="M" {...register('gender')} />
            </label>
            <label>
              여
              <input type="radio" value="F" {...register('gender')} />
            </label>
          </div>
          <div className="flex gap-2">
            <label>가입일</label>
            <input
              {...register('join_dt', {
                required: '가입일을 입력해 주세요',
                pattern: /^\d{4}\.\d{2}\.\d{2}$/gi,
              })}
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-tier-2">
              수정하기
            </button>
            <button type="button" className="bg-tier-5" onClick={handleRemove}>
              삭제하기
            </button>
          </div>
        </form>
      ) : (
        <>{error ?? '알수 없는 에러'}</>
      )}
    </div>
  );
};

export default Detail;
