import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const empty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  flex: 1,
});

export const gamelist = style({
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '0 10px',
  justifyContent: 'space-between',
});

export const body = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: 10,
  padding: 10,
});

export const user = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 10px',
  borderRadius: 6,
  background: palette.primary,
});

export const modal = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: 12,
  alignItems: 'center',
});
