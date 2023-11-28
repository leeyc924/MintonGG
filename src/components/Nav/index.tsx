import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MdHome as MainIcon } from 'react-icons/md';
import { FaUsers as UserIcon } from 'react-icons/fa';
import { FaRankingStar as TierIcon } from 'react-icons/fa6';
import { IconType } from 'react-icons';

const Nav = () => {
  return (
    <div className="w-full h-10 border-t-1 border-solid">
      <ul className="flex h-full">
        <CustomLink pathname="/main" title="메인" Icon={MainIcon} />
        <CustomLink pathname="/user" title="유저" Icon={UserIcon} />
        <CustomLink pathname="/tier" title="티어" Icon={TierIcon} />
      </ul>
    </div>
  );
};

interface CustomLinkProps {
  title: string;
  pathname: string;
  Icon: IconType;
}

const CustomLink = ({ pathname, Icon }: CustomLinkProps) => {
  return (
    <li className="flex-1 flex items-center">
      <Link to={pathname} className="flex items-center justify-center flex-1 text-center">
        <Icon size={24} />
      </Link>
    </li>
  );
};

export default Nav;
