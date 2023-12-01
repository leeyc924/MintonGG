import { Nav } from '@components';
import { ReactNode } from 'react';

const DefaultLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      <div className="shrink-0">
        <Nav />
      </div>
    </div>
  );
};

export default DefaultLayout;
