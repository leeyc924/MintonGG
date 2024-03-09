import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const card = style({
  background: palette.surfaceContainer,
  borderRadius: 12,
  padding: 20,
  gap: 12,
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  paddingBottom: 12,
  borderBottom: `1px solid ${palette.onSurfaceVariant}`,
});

export const content = style({});
export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});
export const best = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});
