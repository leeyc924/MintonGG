import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';

export const header = style({
  height: 64,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  background: palette.surfaceContainer,
  padding: '0 24px',
});
