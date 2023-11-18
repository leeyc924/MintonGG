import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { GamePage, MainPage, UserPage } from '@pages';
import { DefaultLayout } from '@layouts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Navigate to="/user" />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/user" element={<UserPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
