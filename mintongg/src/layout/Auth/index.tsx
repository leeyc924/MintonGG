import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Suspense fallback={<>...loading</>}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
