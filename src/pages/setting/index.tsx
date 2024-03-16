import { Radio, Typography } from '@breadlee/ui';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Main from '@components/Main';
import { useSession } from '@store';
import * as styles from './index.css';

const SettingPage = () => {
  const navigate = useNavigate();
  const auth = useSession(state => state.auth);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme-mode') ?? 'light');

  const handleLogout = useCallback(async () => {
    localStorage.removeItem('accessToken');
    navigate('/account/login');
  }, [navigate]);

  const handleChangeTheme = useCallback((theme: string) => {
    document.documentElement.setAttribute('data-theme-mode', theme);
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, []);

  return (
    <>
      <Header title="설정" />
      <Main>
        <div className={styles.container}>
          <div className={styles.row}>
            <Typography color="onSurface" variant="B3">
              테마
            </Typography>
            <Radio checked={theme === 'light'} label="light" onChange={() => handleChangeTheme('light')} />
            <Radio checked={theme === 'dark'} label="dark" onChange={() => handleChangeTheme('dark')} />
          </div>
          <div className={styles.row}>
            <Typography color="onSurface" variant="B3">
              권한
            </Typography>
            <Typography color="onSurface" variant="B3">
              {auth}
            </Typography>
          </div>
          <div className={styles.row}>
            <button type="button" onClick={handleLogout}>
              <Typography color="onSurface" variant="B3">
                로그아웃
              </Typography>
            </button>
          </div>
        </div>
      </Main>
    </>
  );
};

export default SettingPage;
