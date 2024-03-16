import { Typography } from '@breadlee/ui';
import dayjs from 'dayjs';
import { ReactNode, useCallback } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Main from '@components/Main';
import { authLogout, getBestUser, getNewUserList } from '@api';
import * as styles from './index.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [{ data: newUserListData }, { data: bestUserData }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['new-user-list'],
        queryFn: getNewUserList,
        staleTime: 1000 * 60,
      },
      {
        queryKey: ['best-user'],
        queryFn: getBestUser,
        staleTime: 1000 * 60 * 5,
      },
    ],
  });
  const handleLogout = useCallback(async () => {
    await authLogout();
    navigate('/account/login');
  }, [navigate]);

  return (
    <>
      <Header title="홈">
        <button type="button" onClick={handleLogout}>
          <Typography color="onSurface" variant="D1">
            로그아웃
          </Typography>
        </button>
      </Header>
      <Main>
        <div className={styles.container}>
          <Typography color="primary" component="h2" variant="B1">
            {dayjs().format('YYYY-MM')}
          </Typography>
          <Card title="참여왕">
            {bestUserData.userList.map((user, index) => (
              <div className={styles.best} key={user.id}>
                <Typography color={index === 0 ? 'primary' : 'onSurface'} variant="D1">
                  {user.play_count}회
                </Typography>
                <Typography color={index === 0 ? 'primary' : 'onSurface'} variant="D1">
                  {user.full_name}
                </Typography>
              </div>
            ))}
          </Card>
          <Card title="신규회원">
            {Object.entries(newUserListData.userList).map(([joinDt, userList]) => (
              <div key={joinDt}>
                <Typography color="primary" variant="B3">
                  {joinDt}일
                </Typography>
                <div>
                  {userList.map(user => (
                    <Typography color="onSurface" key={user.id} variant="D1">
                      {user.full_name}
                    </Typography>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </Main>
    </>
  );
};

const Card = ({ children, title }: { title: string; children: ReactNode }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <Typography color="onSurface" component="h3" variant="B2">
          {title}
        </Typography>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default HomePage;
