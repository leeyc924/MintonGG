import { Typography } from '@breadlee/ui';
import Header from '@components/Header';
import Main from '@components/Main';

const HomePage = () => {
  return (
    <>
      <Header title="대시보드" />
      <Main>
        <Typography color="onSurface">안녕하세요 동호회 유저 매니저 입니다</Typography>
      </Main>
    </>
  );
};

export default HomePage;
