import { palette } from '@breadlee/ui';
import { style } from '@vanilla-extract/css';
export const root = style({
  background: palette.Background,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});
export const header = style({});
export const main = style({ flex: 1, overflowY: 'auto' });
