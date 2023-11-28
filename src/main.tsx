import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { TierPage, MainPage, UserPage } from '@pages';
import { DefaultLayout } from '@layouts';
import LoginPage from './pages/Login';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Navigate to="/user" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/tier" element={<TierPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
