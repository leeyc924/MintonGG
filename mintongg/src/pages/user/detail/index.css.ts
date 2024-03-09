import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: 300,
  margin: '0 auto',
  gap: 20,
});

export const col = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
});

export const row = style({
  display: 'flex',
  gap: 10,
});
