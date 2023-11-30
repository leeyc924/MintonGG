import { getUserDetail } from '@api';
import { useQuery } from '@tanstack/react-query';
import { FailureResponse } from '@types';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export interface EditProps {}

const Edit = ({}: EditProps) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log(searchParams.get('id'));
  }, []);
  // const { data, isLoading, error } = useQuery<Awaited<ReturnType<typeof getUserDetail>>, FailureResponse>({
  //   queryKey: ['users'],
  //   queryFn: getUserDetail,
  // });

  return <div>user 상세</div>;
};

export default Edit;
