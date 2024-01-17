import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import { DateField } from '@mui/x-date-pickers/DateField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addUser } from '@api-client';
import { Gender } from '@types';
import { Modal } from '@components';

export interface UserAddModalProps {
  isOpen: boolean;
  onClose(): void;
}

interface FieldValue {
  name: string;
  age: string;
  gender: Gender;
  address: string;
  join_dt: Dayjs;
}

const UserAddModal = ({ isOpen, onClose }: UserAddModalProps) => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FieldValue>({
    defaultValues: {
      address: '영등포',
      age: '2004',
      gender: 'M',
      join_dt: dayjs(),
      name: '홍길동',
    },
  });

  const onSubmit = useCallback<SubmitHandler<FieldValue>>(
    async ({ address, age, gender, join_dt, name }) => {
      try {
        await addUser({
          address,
          age,
          gender,
          join_dt: dayjs(join_dt).format('YYYY.MM.DD'),
          name,
        });
        router.refresh();
        toast('추가 성공', { type: 'success' });
        onClose();
      } catch (error) {
        toast('추가 실패', { type: 'error' });
      }
    },
    [onClose, router],
  );

  const onError = useCallback<SubmitErrorHandler<FieldValue>>(error => {
    if (error['age']) {
      toast('YYYY 형식으로 입력해주세요', { type: 'error' });
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="유저 추가">
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
          <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }}>
            추가
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserAddModal;
