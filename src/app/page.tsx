import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Logout from './logout';

export default function Home() {
  return (
    <div>
      <Typography>안녕하세요 동호회 유저 매니저 입니다</Typography>
      <Logout />
      <Link href="/privacy">
        <Typography variant="caption">개인정보처리방침</Typography>
      </Link>
    </div>
  );
}
