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

const HomePage = lazy(() => import('./pages/home/index'));
const LoginPage = lazy(() => import('./pages/account/login'));
const UserListPage = lazy(() => import('./pages/user/list'));
const UserDetailPage = lazy(() => import('./pages/user/detail'));
const GamePage = lazy(() => import('./pages/game'));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
    ],
  },
  {
    path: '/home',
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
        element: <GamePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  </QueryClientProvider>,
);
