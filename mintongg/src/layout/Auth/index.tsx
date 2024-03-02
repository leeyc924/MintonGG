import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './index.css';

const AuthLayout = () => {
  return (
    <div className={styles.root}>
      <Suspense fallback={<>...loading</>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
