import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '@components/Nav';
import * as styles from './index.css';

const MainLayout = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <Suspense fallback={<>...loading</>}>
            <Outlet />
          </Suspense>
        </div>
        <Nav />
      </div>
    </>
  );
};

export default MainLayout;
