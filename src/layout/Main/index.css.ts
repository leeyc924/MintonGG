import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';

export const root = style({
  background: palette.surface,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflowY: 'auto',
  width: '100%',
});
