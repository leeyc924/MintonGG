import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="w-full h-12 shrink-0">
      <ul className="flex h-full">
        <CustomLink pathname="/main" title="메인" />
        <CustomLink pathname="/game" title="게임" />
        <CustomLink pathname="/user" title="유저" />
      </ul>
    </div>
  );
};

interface CustomLinkProps {
  title: string;
  pathname: string;
}

const CustomLink = ({ title, pathname }: CustomLinkProps) => {
  return (
    <li className="flex-1 flex items-center">
      <Link to={pathname} className="flex-1 text-center">
        {title}
      </Link>
    </li>
  );
};

export default Nav;
