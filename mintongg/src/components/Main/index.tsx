import { ReactNode } from 'react';
import * as styles from './index.css';

export interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
