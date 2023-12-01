import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './tailwind.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { TierPage, MainPage, UserListPage, LoginPage, UserDetailPage } from '@pages';
import { DefaultLayout } from '@layouts';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Navigate to="/main" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user/list" element={<UserListPage />} />
      <Route path="/user/detail" element={<UserDetailPage />} />
      <Route path="/tier" element={<TierPage />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
