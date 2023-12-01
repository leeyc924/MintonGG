
import { getUserDetail } from '@api-server';
import Client from './client';
import { parseToNumber } from '../../../utils/parse';

const UserDetailPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const id = parseToNumber(searchParams.id);

const data = await getUserDetail({id});
  return (
  <Client data={data}/>
  );
};

export default UserDetailPage;
