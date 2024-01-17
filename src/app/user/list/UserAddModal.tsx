import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCallback, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import NativeSelect from '@mui/material/NativeSelect';
import { Controller, useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import { DateField } from '@mui/x-date-pickers/DateField';
import { upsertGame } from '@api-client';
import { GameDetailResponse, Gender, User } from '@types';
import { Modal } from '@components';

export interface UserAddModalProps {
  isOpen: boolean;
  onClose(): void;
}

interface FieldValue {
  id: number;
  name: string;
  age: string;
  gender: Gender;
  address: string;
  join_dt: Dayjs;
}

const UserAddModal = ({ isOpen, onClose }: UserAddModalProps) => {
  const router = useRouter();
  const { control } = useForm<FieldValue>({
    defaultValues: {
      address: '영등포',
      age: '2004',
      gender: 'M',
      // join_dt: dayjs().toISOString(),
      name: '홍길동',
    },
  });

  const onSubmit = useCallback(async () => {
    try {
      router.refresh();
      toast('추가 성공', { type: 'success' });
      onClose();
    } catch (error) {
      toast('추가 실패', { type: 'error' });
    }
  }, [onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="유저 추가">
      <Controller
        control={control}
        name="name"
        rules={{ required: '이름을 입력해 주세요' }}
        render={({ field: { onChange, value, name, ref } }) => (
          <div>
            <FormLabel>이름</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              value={value}
              name={name}
              inputRef={ref}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="age"
        rules={{ required: '나이를 입력해 주세요', maxLength: 4 }}
        render={({ field: { onChange, value, name, ref } }) => (
          <div>
            <FormLabel>나이</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              value={value}
              name={name}
              inputRef={ref}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{ required: '지역을 입력해 주세요' }}
        render={({ field: { onChange, value, name, ref } }) => (
          <div>
            <FormLabel>지역</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              value={value}
              name={name}
              inputRef={ref}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="gender"
        rules={{ required: '지역을 입력해 주세요' }}
        render={({ field: { onChange, value, name } }) => (
          <div>
            <FormLabel>성별</FormLabel>
            <RadioGroup row name={name} value={value} onChange={onChange}>
              <FormControlLabel value="M" control={<Radio />} label="남" />
              <FormControlLabel value="F" control={<Radio />} label="여" />
            </RadioGroup>
          </div>
        )}
      />
      {/* <Controller
        control={control}
        name="join_dt"
        rules={{
          required: '가입일을 입력해 주세요',
          pattern: /^\d{4}\.\d{2}\.\d{2}$/gi,
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth>
            <FormLabel>가입일</FormLabel>
            <DateField value={value} onChange={newValue => onChange(newValue)} format="YYYY.MM.DD" fullWidth />
          </FormControl>
        )}
      /> */}
    </Modal>
  );
};

export default UserAddModal;
