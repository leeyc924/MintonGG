import { Typography, palette } from '@breadlee/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import Icon from '@breadlee/icons';
import { classnames } from '@breadlee/utils';
import { MouseEventHandler, memo, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { getUserList } from '@api';
import Header from '@components/Header';
import Main from '@components/Main';
import * as styles from './index.css';
import UserModal from './UserModal';

const UserListPage = () => {
  const { data } = useSuspenseQuery({ queryKey: ['todos'], queryFn: getUserList });
  const { femaleCount, genderRatio, maleCount } = useMemo(() => {
    const { femaleCount, maleCount } = data.userList.reduce(
      (acc, cur) =>
        cur.full_name.includes('남')
          ? { ...acc, maleCount: acc.maleCount + 1 }
          : { ...acc, femaleCount: acc.femaleCount + 1 },
      { femaleCount: 0, maleCount: 0 } as { femaleCount: number; maleCount: number },
    );

    const gcd = (a: number, b: number): number => {
      if (b === 0) {
        return a;
      }
      return gcd(b, a % b);
    };

    // 최대공약수 구하기
    const greatestCommonDivisor = gcd(maleCount, femaleCount);

    // 약분된 비율 계산
    const reducedMale = maleCount / greatestCommonDivisor;
    const reducedFemale = femaleCount / greatestCommonDivisor;

    const genderRatio = `${reducedMale}:${reducedFemale}`;
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

  const handleAddUser = useCallback(() => {}, []);

  return (
    <>
      <Header title="유저목록">
        <button style={{ marginRight: 15 }} type="button" onClick={() => handleAddUser()}>
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
              총원 : {data.userList.length}명
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
          <Row col={['no', '이름', '가입일', '최근 참여일']} />
          {data.userList.map((user, index) => (
            <Row
              key={user.id}
              col={[
                `${index + 1}`,
                user.full_name,
                dayjs(user.join_dt).format('YY.MM.DD'),
                user['play_dt'] ? dayjs(user['play_dt']).format('YY.MM.DD') : '-',
              ]}
              onEdit={() => console.log()}
            />
          ))}
        </div>
      </Main>
    </>
  );
};

const Row = memo(
  ({ col, onEdit }: { col: [string, string, string, string]; onEdit?: MouseEventHandler<HTMLButtonElement> }) => {
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
        <div className={classnames(styles.col, styles.edit)}>
          {onEdit && (
            <button type="button">
              <Icon name="meatball" />
            </button>
          )}
        </div>
      </div>
    );
  },
);

export default UserListPage;
