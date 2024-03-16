import { ReactNode } from 'react';
import { Typography } from '@breadlee/ui';
import * as styles from './index.css';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ children, title }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Typography color="onSurfaceVariant" component="h1" variant="H4">
        {title}
      </Typography>
      <div>{children}</div>
    </header>
  );
};

export default Header;
