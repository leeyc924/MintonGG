import { BottomSheet, Radio, TextField } from '@breadlee/ui';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Gender } from '@types';
import { addUser } from '@api';
import * as styles from './index.css';

export interface UserAddModalProps {
  closeModal(): void;
}

interface FieldValue {
  name: string;
  age: string;
  gender: Gender;
  address: string;
  join_dt: string;
}

const UserAddModal = ({ closeModal }: UserAddModalProps) => {
  const [form, setForm] = useState<FieldValue>({
    name: '홍길동',
    age: '2002',
    address: '영등포',
    gender: 'M',
    join_dt: dayjs().format('YYYY.MM.DD'),
  });

  const onSubmit = useCallback(async () => {
    try {
      const { address, age, gender, join_dt, name } = form;

      if (!/^\d{4}\.\d{2}\.\d{2}$/.test(join_dt)) {
        toast('가입일은 YYYY.MM.DD로 작성해주세요 ', { type: 'error' });
        return;
      }

      if (!/^\d{4}$/.test(age)) {
        toast('나이는 YYYY로 작성해주세요 ', { type: 'error' });
        return;
      }

      await addUser({
        address,
        age,
        gender,
        join_dt,
        name,
      });
      toast('추가 성공', { type: 'success' });
      closeModal();
    } catch (error) {
      toast('추가 실패', { type: 'error' });
    }
  }, [closeModal, form]);

  const handleChange = useCallback((key: keyof FieldValue, value: string) => {
    setForm(form => ({ ...form, [key]: value }));
  }, []);

  return (
    <BottomSheet
      cancelText="닫기"
      submitText="추가"
      title="신규회원"
      isOpen
      onCancel={closeModal}
      onClose={closeModal}
      onSubmit={onSubmit}
    >
      <div className={styles.form}>
        <TextField placeholder="이름" value={form.name} onChange={e => handleChange('name', e.target.value)} />
        <TextField
          maxLength={4}
          placeholder="나이"
          type="number"
          value={form.age}
          onChange={e => handleChange('age', e.target.value)}
        />
        <TextField placeholder="지역" value={form.address} onChange={e => handleChange('address', e.target.value)} />
        <div className={styles.formRow}>
          <Radio checked={form.gender === 'M'} label="남" onChange={() => handleChange('gender', 'M')} />
          <Radio checked={form.gender === 'F'} label="여" onChange={() => handleChange('gender', 'F')} />
        </div>
        <TextField placeholder="가입일" value={form.join_dt} onChange={e => handleChange('join_dt', e.target.value)} />
      </div>
    </BottomSheet>
  );
};

export default UserAddModal;
