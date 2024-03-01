import { Typography, palette, useModalManager } from '@breadlee/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import Icon from '@breadlee/icons';
import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getUserList } from '@api';
import Header from '@components/Header';
import Main from '@components/Main';
import * as styles from './index.css';
import UserAddModal from './UserAddModal';

const UserListPage = () => {
  const { data } = useSuspenseQuery({ queryKey: ['todos'], queryFn: getUserList });

  const { closeModal, modalOpenId, openModal } = useModalManager({ idList: ['userAdd'] });

  const { femaleCount, genderRatio, maleCount } = useMemo(() => {
    const { femaleCount, maleCount } = data.userList.reduce(
      (acc, cur) =>
        cur.full_name.includes('남')
          ? { ...acc, maleCount: acc.maleCount + 1 }
          : { ...acc, femaleCount: acc.femaleCount + 1 },
      { femaleCount: 0, maleCount: 0 } as { femaleCount: number; maleCount: number },
    );

    const genderRatio = `${(maleCount / femaleCount).toFixed(1)} : 1`;
    return { genderRatio, femaleCount, maleCount };
  }, [data.userList]);

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

  return (
    <>
      <Header title="유저목록">
        <button style={{ marginRight: 15 }} type="button" onClick={() => openModal('userAdd')}>
          <Icon color={palette.onSurface} name="plus" />
        </button>
        <button type="button" onClick={() => handleCopyUser()}>
          <Icon color={palette.onSurface} name="copy" />
        </button>
      </Header>
      <Main>
        <div className={styles.container}>
          <div className={styles.top}>
            <Typography color="onSurface" variant="B2">
              총 {data.userList.length}
            </Typography>
            <Typography color="primary" variant="B2">
              남 {maleCount}
            </Typography>
            <Typography color="error" variant="B2">
              여 {femaleCount}
            </Typography>
            <Typography color="secondary" variant="B2">
              {genderRatio}
            </Typography>
          </div>
          <div className={styles.row}>
            <Typography className={styles.col[0]} color="onSurface" variant="B3">
              no
            </Typography>
            <Typography className={styles.col[1]} color="onSurface" variant="B3">
              이름
            </Typography>
            <Typography className={styles.col[2]} color="onSurface" variant="B3">
              가입일
            </Typography>
            <Typography className={styles.col[3]} color="onSurface" variant="B3">
              최근 참여일
            </Typography>
          </div>
          {data.userList.map((user, index) => (
            <div className={styles.row} key={user.id}>
              <Typography
                className={styles.col[0]}
                color={user.position === 0 ? 'primary' : user.position === 1 ? 'error' : 'onSurface'}
                variant="B3"
              >
                {index + 1}
              </Typography>
              <Link className={styles.col[1]} to={`/user/detail?id=${user.id}`} onClick={() => openModal('userAdd')}>
                <Typography color="onSurface" variant="B3">
                  {user.full_name}
                </Typography>
              </Link>
              <Typography className={styles.col[2]} color="onSurface" variant="B3">
                {dayjs(user.join_dt).format('YY.MM.DD')}
              </Typography>
              <Typography className={styles.col[3]} color="onSurface" variant="B3">
                {user['play_dt'] ? dayjs(user['play_dt']).format('YY.MM.DD') : '-'}
              </Typography>
            </div>
          ))}
        </div>
        {modalOpenId === 'userAdd' && <UserAddModal closeModal={closeModal} />}
      </Main>
    </>
  );
};

export default UserListPage;
