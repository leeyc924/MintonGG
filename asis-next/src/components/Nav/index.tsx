'use client';
import Link from 'next/link';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import MainIcon from '@mui/icons-material/HomeRounded';
import UserIcon from '@mui/icons-material/PeopleAltRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();

  return pathname !== '/login' ? (
    <BottomNavigation sx={{ borderTop: '1px solid #ddd' }}>
      <BottomNavigationAction component={Link} href="/" icon={<MainIcon />} />
      <BottomNavigationAction component={Link} href="/user/list" icon={<UserIcon />} />
      <BottomNavigationAction component={Link} href="/game" icon={<CalendarIcon />} />
    </BottomNavigation>
  ) : null;
};

export default Nav;
