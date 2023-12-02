'use client';

import { useCallback } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { DateField } from '@mui/x-date-pickers/DateField';
import FormControl from '@mui/material/FormControl';
import { editUser, removeUser } from '@api-client';
import { Gender, UserDetailResponse } from '@types';

interface UseDetailClientProps {
  data: UserDetailResponse;
}

interface FieldValue {
  id: number;
  name: string;
  age: string;
  gender: Gender;
  address: string;
  join_dt: Dayjs;
}

const UserDetailPage = ({ data: { userInfo } }: UseDetailClientProps) => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FieldValue>({
    defaultValues: {
      ...userInfo,
      join_dt: dayjs(userInfo.join_dt),
    },
  });

  const onSubmit: SubmitHandler<FieldValue> = useCallback(
    async ({ id, address, age, gender, join_dt, name }) => {
      try {
        if (!id) {
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
        alert('수정 성공');
      } catch (error) {
        console.log(`error`, error);
        alert('수정 실패');
      }
    },
    [userInfo?.id],
  );

  const onError = useCallback<SubmitErrorHandler<FieldValue>>(error => {
    if (error['age']) {
      alert('YYYY 형식으로 입력해주세요');
    }
  }, []);

  const handleRemove = useCallback(async () => {
    try {
      if (!userInfo.id) {
        return;
      }
      await removeUser({ id: userInfo?.id });
      alert('삭제 성공');
      router.push('/user/list');
    } catch (error) {
      console.log(`error`, error);
      alert('삭제 실패');
    }
  }, [router, userInfo?.id]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit, onError)} noValidate sx={{ mt: 1 }}>
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
      <Controller
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
      />
      <Box display="flex" gap={2} justifyContent={'right'}>
        <Button color="error" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleRemove}>
          삭제
        </Button>
        <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }}>
          수정
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetailPage;
