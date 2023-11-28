import { Nav } from '@components';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <div className="flex-0">
        <Nav />
      </div>
    </div>
  );
};

export default DefaultLayout;
