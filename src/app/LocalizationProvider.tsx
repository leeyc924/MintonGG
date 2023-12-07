'use client';

import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';

export interface LocalizationProviderProps {
  children: ReactNode;
}

const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  return <MuiLocalizationProvider dateAdapter={AdapterDayjs}>{children}</MuiLocalizationProvider>;
};

export default LocalizationProvider;
