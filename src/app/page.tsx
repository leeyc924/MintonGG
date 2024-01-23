import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Logout from './logout';

export default function Home() {
  return (
    <div>
      <Typography>안녕하세요 동호회 유저 매니저 입니다</Typography>
      <Logout />
      <Link href="/privacy">개인정보처리방침</Link>
    </div>
  );
}
