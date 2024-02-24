import { DataGrid, DataGridProps, Typography, palette } from '@breadlee/ui';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import axiosClient from 'src/api/instance';

const UserListPage = () => {
  const { data } = useQuery({ queryKey: ['todos'], queryFn: async () => await axiosClient.get('/user/list') });
  const columns: DataGridProps['columns'] = [
    { id: 'no', label: 'no', width: 40 },
    { id: 'name', label: '이름' },
    { id: 'joinDt', label: '가입일', width: 90 },
    {
      id: 'recentDt',
      label: '최근참여일',
      width: 110,
    },
  ];

  const rows: DataGridProps['rows'] = data?.data
    ? data.data.userList.map((d, i) => ({
        no: i,
        name: d.full_name,
        joinDt: dayjs(d.join_dt).format('YY.MM.DD'),
        recentDt: d.play_dt ? (
          <Typography color="SurfaceVariant" variant="D1" weight="regular" isEllipsisOneLine>
            {dayjs(d.play_dt).format('YY.MM.DD')}
            <Typography color="Primary" variant="D1" weight="regular">
              {d.play_count}
            </Typography>
          </Typography>
        ) : (
          '-'
        ),
      }))
    : [];

  return (
    <div>
      <DataGrid columns={columns} dataGridTitleLabel="유저 목록 테이블" rows={rows} />
    </div>
  );
};

export default UserListPage;
