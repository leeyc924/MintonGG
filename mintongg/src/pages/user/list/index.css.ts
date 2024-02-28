import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';

export const count = style({
  fontSize: 10,
  verticalAlign: 'top',
});
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 0',
});

export const col = style({
  display: 'inline-flex',
  justifyContent: 'center',
  flex: 1,
});

export const edit = style({
  maxWidth: 30,
  transform: 'rotate(90deg)',
});

export const top = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  padding: '0 20px',
  height: 40,
  gap: 10,
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  height: 60,
  padding: '0 10px 0 20px',
  selectors: {
    '& + &': {
      borderTop: `1px solid ${palette.outlineVariant}`,
    },
  },
});