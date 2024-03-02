import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@breadlee/ui';
import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastContainer from '@components/ToastContainer';
import MainLayout from './layout/Main';
import AuthLayout from './layout/Auth';
import 'react-toastify/dist/ReactToastify.css';
import '@breadlee/ui/dist/css/index.css';
import '@breadlee/icons/dist/icons.css';
import '@breadlee/icons/dist/icons.woff';

const HomePage = lazy(() => import('./pages/index'));
const LoginPage = lazy(() => import('./pages/account/login'));
const LogoutPage = lazy(() => import('./pages/account/logout'));
const UserListPage = lazy(() => import('./pages/user/list'));
const UserDetailPage = lazy(() => import('./pages/user/detail'));
const GameListPage = lazy(() => import('./pages/game/list'));
const GameDetailPage = lazy(() => import('./pages/game/detail'));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/account',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/account/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'logout',
        element: <LogoutPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/user/list" />,
      },
      {
        path: 'list',
        element: <UserListPage />,
      },
      {
        path: 'detail',
        element: <UserDetailPage />,
      },
    ],
  },
  {
    path: '/game',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/game/list" />,
      },
      {
        path: 'list',
        element: <GameListPage />,
      },
      {
        path: 'detail',
        element: <GameDetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme="dark">
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  </QueryClientProvider>,
);
