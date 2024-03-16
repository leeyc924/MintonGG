import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';

export const nav = style({
  flexShrink: 0,
  width: '100%',
  height: 50,
  background: palette.surfaceContainer,
  borderTop: `1px solid ${palette.outline}`,
});

export const ul = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});

export const li = style({
  flex: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
});
