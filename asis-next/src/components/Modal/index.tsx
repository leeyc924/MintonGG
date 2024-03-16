import { Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  cancelText?: string;
  submitText?: string;
  onCancel?(): void;
  onSubmit?(): void;
  onClose(): void;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  cancelText = '취소',
  submitText = '확인',
  onCancel,
  onSubmit,
}: ModalProps) => {
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}
    >
      <Container
        sx={{
          position: 'relative',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          p: '20px',
          borderRadius: '8px',
          maxHeight: '550px',
          gap: 1,
          overflow: 'hidden',
        }}
      >
        <Box>
          <Typography variant="h1" fontSize={24}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ overflowY: 'auto' }}>{children}</Box>
        <Box display="flex" marginLeft="auto">
          {onCancel && (
            <Button color="primary" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {onSubmit && <Button onClick={onSubmit}>{submitText}</Button>}
        </Box>
        <button style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={onClose}>
          <CloseIcon />
        </button>
      </Container>
    </MuiModal>
  );
};

export default Modal;
