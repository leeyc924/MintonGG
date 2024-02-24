import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@breadlee/ui';
import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layout/Main';
import AuthLayout from './layout/Auth';

const HomePage = lazy(() => import('./pages/index'));
const LoginPage = lazy(() => import('./pages/account/login'));
const LogoutPage = lazy(() => import('./pages/account/logout'));
const UserListPage = lazy(() => import('./pages/user/list'));
const UserDetailPage = lazy(() => import('./pages/user/detail'));
const GameListPage = lazy(() => import('./pages/game/list'));
const GameDetailPage = lazy(() => import('./pages/game/detail'));

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

const queryClient = new QueryClient();
createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>,
);
