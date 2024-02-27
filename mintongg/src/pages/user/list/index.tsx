import { Typography, palette } from '@breadlee/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import Icon from '@breadlee/icons';
import { ReactNode, memo, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { getUserList } from '@api';
import Header from '@components/Header';
import Main from '@components/Main';
import * as styles from './index.css';

const UserListPage = () => {
  const { data } = useSuspenseQuery({ queryKey: ['todos'], queryFn: getUserList });
  const copyUserList = useMemo(
    () =>
      data.userList.reduce((copyText, cur) => {
        const name = cur['full_name'];
        return copyText + '\n' + name;
      }, '') || '',
    [data?.userList],
  );

  const handleCopyUser = useCallback(async () => {
    await navigator.clipboard.writeText(copyUserList);
  }, [copyUserList]);
  console.log(`data`, data);
  return (
    <>
      <Header title="유저목록">
        <button onClick={() => handleCopyUser()}>
          <Icon color={palette.onSurface} name="copy" />
        </button>
      </Header>
      <Main>
        <div className={styles.container}>
          <Row col={['no', '이름', '가입일', '최근 참여일']} />
          {data.userList.map((user, index) => (
            <Row
              key={user.id}
              col={[
                `${index + 1}`,
                user.full_name,
                dayjs(user.join_dt).format('YY.MM.DD'),
                <>
                  {user['play_dt'] ? dayjs(user['play_dt']).format('YY.MM.DD') : '-'}
                  {user['play_count'] !== '0' && (
                    <Typography className={styles.count} color="primary" variant="D2">
                      {user['play_count']}
                    </Typography>
                  )}
                </>,
              ]}
            />
          ))}
        </div>
      </Main>
    </>
  );
};

const Row = memo(({ col }: { col: [string, string, string, ReactNode] }) => {
  return (
    <div className={styles.row}>
      <Typography className={styles.col} color="onSurface" style={{ maxWidth: 30 }} variant="B3">
        {col[0]}
      </Typography>
      <Typography className={styles.col} color="onSurface" style={{ flex: 2 }} variant="B3">
        {col[1]}
      </Typography>
      <Typography className={styles.col} color="onSurface" variant="B3">
        {col[2]}
      </Typography>
      <Typography className={styles.col} color="onSurface" variant="B3">
        {col[3]}
      </Typography>
    </div>
  );
});

export default UserListPage;
