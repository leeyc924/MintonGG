import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUserDetail } from '@api';
import { Loading } from '@components';
import { FailureResponse } from '@types';
import { parseToNumber } from '@utils';

export interface EditProps {}

const Edit = ({}: EditProps) => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useQuery<Awaited<ReturnType<typeof getUserDetail>>, FailureResponse>({
    queryKey: ['detail'],
    queryFn: () => getUserDetail({ id: parseToNumber(searchParams.get('id')) }),
  });
  console.log(`error`, error);
  console.log(`searchParams`, searchParams.get('id'));
  return <div>{isLoading ? <Loading /> : error ? error.message : 'user 상세'}</div>;
};

export default Edit;
