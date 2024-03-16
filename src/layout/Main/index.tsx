import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSession } from '@store';
import Nav from '@components/Nav';
import { authCheck } from '@api';
import * as styles from './index.css';

const MainLayout = () => {
  const { auth, setAuth } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const { auth } = await authCheck();
        setAuth(auth);
      } catch (error) {
        navigate('/account/login', { replace: true });
      }
    })();
  }, [navigate, setAuth]);

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
