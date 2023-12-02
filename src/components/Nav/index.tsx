import Link from 'next/link';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import MainIcon from '@mui/icons-material/HomeRounded';
import UserIcon from '@mui/icons-material/PeopleAltRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';

const Nav = () => {
  return (
    <BottomNavigation>
      <BottomNavigationAction component={Link} href="/" icon={<MainIcon />} />
      <BottomNavigationAction component={Link} href="/user/list" icon={<UserIcon />} />
      <BottomNavigationAction component={Link} href="/game" icon={<CalendarIcon />} />
    </BottomNavigation>
  );
};

export default Nav;
