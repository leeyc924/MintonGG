import { style } from '@vanilla-extract/css';

export const container = style({
  width: 360,
  height: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 30,
});

export const title = style({
  display: 'flex',
  justifyContent: 'center',
});
