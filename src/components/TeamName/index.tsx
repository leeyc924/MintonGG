import { ReactNode, memo } from 'react';
import './index.css';

export interface TeamNameProps {
  children: ReactNode;
}

const TeamName = memo(({ children }: TeamNameProps) => {
  return <p className="team-name">{children}</p>;
});

export default TeamName;
