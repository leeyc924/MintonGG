import { Nav } from '@components';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-full">
      {/* <Nav /> */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
