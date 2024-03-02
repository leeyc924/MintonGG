import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Radio, TextField, Typography } from '@breadlee/ui';
import { parseToNumber } from '@breadlee/utils';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useSession } from '@store';
import { editUser, getUserDetail, removeUser } from '@api';
import { Gender } from '@types';
import * as styles from './index.css';

interface FieldValue {
  name: string;
  age: string;
  gender: Gender;
  address: string;
  join_dt: string;
}

const UserDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');
  const auth = useSession(state => state.auth);
  const isEditAuth = useMemo(() => auth === 'ADMIN' || auth === 'MANAGER', [auth]);

  const {
    data: { userInfo },
  } = useSuspenseQuery({ queryKey: ['user-detail', id], queryFn: () => getUserDetail({ id: parseToNumber(id) }) });

  const [form, setForm] = useState<FieldValue>({
    name: userInfo.name,
    age: userInfo.age,
    address: userInfo.address,
    gender: userInfo.gender,
    join_dt: dayjs(userInfo.join_dt).format('YYYY.MM.DD'),
  });

  const handleSubmit = useCallback(async () => {
    try {
      const { address, age, gender, join_dt, name } = form;
      if (!userInfo.id) {
        return;
      }

      if (!/^\d{4}\.\d{2}\.\d{2}$/.test(join_dt)) {
        toast('가입일은 YYYY.MM.DD로 작성해주세요 ', { type: 'error' });
        return;
      }

      if (!/^\d{4}$/.test(age)) {
        toast('나이는 YYYY로 작성해주세요 ', { type: 'error' });
        return;
      }

      await editUser({
        address,
        age,
        gender,
        join_dt: dayjs(join_dt).format('YYYY.MM.DD'),
        name,
        id: userInfo?.id,
      });
      toast('수정에 성공했습니다', { type: 'success' });
    } catch (error) {
      console.log(`error`, error);
      toast('수정에 실패했습니다', { type: 'error' });
    }
  }, [form, userInfo?.id]);

  const handleChange = useCallback((key: keyof FieldValue, value: string) => {
    setForm(form => ({ ...form, [key]: value }));
  }, []);

  const handleRemove = useCallback(async () => {
    try {
      if (!userInfo.id) {
        return;
      }

      await removeUser({ id: userInfo?.id });
      toast('삭제에 성공했습니다', { type: 'success' });
      navigate('/user/list');
    } catch (error) {
      console.log(`error`, error);
      toast('삭제에 실패했습니다', { type: 'error' });
    }
  }, [navigate, userInfo.id]);

  return (
    <form className={styles.container}>
      <label className={styles.col}>
        <Typography color="onSurface">이름</Typography>
        <TextField disabled={!isEditAuth} value={form.name} onChange={e => handleChange('name', e.target.value)} />
      </label>
      <label className={styles.col}>
        <Typography color="onSurface">나이</Typography>
        <TextField
          disabled={!isEditAuth}
          maxLength={4}
          type="number"
          value={form.age}
          onChange={e => handleChange('age', e.target.value)}
        />
      </label>
      <label className={styles.col}>
        <Typography color="onSurface">지역</Typography>
        <TextField
          disabled={!isEditAuth}
          value={form.address}
          onChange={e => handleChange('address', e.target.value)}
        />
      </label>
      <label className={styles.col}>
        <Typography color="onSurface">성별</Typography>
        <div className={styles.row}>
          {isEditAuth ? (
            <>
              <Radio checked={form.gender === 'M'} label="남" onChange={() => handleChange('gender', 'M')} />
              <Radio checked={form.gender === 'F'} label="여" onChange={() => handleChange('gender', 'F')} />
            </>
          ) : form.gender === 'F' ? (
            <Typography color="error">여</Typography>
          ) : (
            <Typography color="primary">남</Typography>
          )}
        </div>
      </label>
      <label className={styles.col}>
        <Typography color="onSurface">가입일</Typography>
        <TextField
          disabled={!isEditAuth}
          value={form.join_dt}
          onChange={e => handleChange('join_dt', e.target.value)}
        />
      </label>
      {isEditAuth && (
        <div className={styles.row} style={{ marginLeft: 'auto' }}>
          <Button color="error" onClick={handleRemove}>
            삭제
          </Button>
          <Button onClick={handleSubmit}>수정</Button>
        </div>
      )}
    </form>
  );
};

export default UserDetailPage;
