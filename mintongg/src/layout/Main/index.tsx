import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '@components/Nav';
import * as styles from './index.css';

const MainLayout = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>header</header>
      <main className={styles.main}>
        <Suspense fallback={<>...loading</>}>
          <Outlet />
        </Suspense>
      </main>
      <Nav />
    </div>
  );
};

export default MainLayout;
