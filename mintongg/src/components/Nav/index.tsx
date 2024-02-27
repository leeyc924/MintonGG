import { NavLink } from 'react-router-dom';
import Icon, { IconProps } from '@breadlee/icons';
import { palette } from '@breadlee/ui';
import * as styles from './index.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <Link iconName="home" path="/" />
        <Link iconName="human" path="/user" />
        <Link iconName="calendar" path="/game" />
      </ul>
    </nav>
  );
};

const Link = ({ iconName, path }: { path: string; iconName: IconProps['name'] }) => {
  return (
    <li className={styles.li}>
      <NavLink to={path}>
        <Icon color={palette.onSurfaceVariant} name={iconName} />
      </NavLink>
    </li>
  );
};

export default Nav;
