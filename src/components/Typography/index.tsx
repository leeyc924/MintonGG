'use client';

import { AllHTMLAttributes, memo, ReactNode } from 'react';
import { Palette } from '@types';
import { classnames } from '@utils';

export interface TypographyProps
  extends Omit<
    AllHTMLAttributes<HTMLHeadingElement | HTMLLabelElement | HTMLDivElement | HTMLUListElement | HTMLLIElement>,
    'type'
  > {
  /** 텍스트 타입 지정 */
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  /** HTML 요소로 사용할 문자열 */
  tag?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'strong'
    | 'em'
    | 'address'
    | 'span'
    | 'p'
    | 'div'
    | 'ul'
    | 'li'
    | 'label';
  /** font weight */
  weight?: 'regular' | 'medium' | 'bold';
  /** font color */
  color?: Palette;
  /** underline */
  underline?: boolean;
  /** text */
  children: ReactNode;
  /** 1줄 ...표시 */
  isEllipsisOneLine?: boolean;
}

const Typography = ({
  fontSize = 'base',
  tag = 'span',
  weight = 'regular',
  color,
  underline,
  children,
  isEllipsisOneLine,
  ...props
}: TypographyProps) => {
  const Component = tag;
  return (
    <Component
      className={classnames({
        ['underline']: !!underline,
        ['text-ellipsis']: !!isEllipsisOneLine,
        'text-xs': fontSize === 'xs',
        'text-sm': fontSize === 'sm',
        'text-base': fontSize === 'base',
        'text-lg': fontSize === 'lg',
        'text-xl': fontSize === 'xl',
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';
export default memo(Typography);
