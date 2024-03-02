import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSession } from '@store';
import { toast } from 'react-toastify';
import Nav from '@components/Nav';
import { authCheck } from '@api';
import * as styles from './index.css';

const MainLayout = () => {
  const { auth, setAuth } = useSession();

  useEffect(() => {
    (async function () {
      try {
        const { auth } = await authCheck();
        setAuth(auth);
      } catch (error) {
        toast('로그인정보가 없습니다', { type: 'error' });
      }
    })();
  }, [setAuth]);

  if (auth === 'NONE') {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Suspense fallback={<>...loading</>}>
          <Outlet />
        </Suspense>
      </div>
      <Nav />
    </div>
  );
};

export default MainLayout;
