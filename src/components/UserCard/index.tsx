import { TIER_COLOR } from '@constants';
import { GameUser } from '@types';

export interface UserCardProps {
  onDelete(id: GameUser['id']): void;
  onAdd(user: GameUser): void;
  user: GameUser;
}

const UserCard = ({ user, onAdd, onDelete }: UserCardProps) => {
  return (
    <div
      className={`flex-shrink-0 flex w-full h-20 p-2 rounded-lg ${TIER_COLOR[user.tier].border} border border-solid ${
        TIER_COLOR[user.tier].background
      }`}
    >
      <div className="flex-1">
        {user.name}
        <br />
        게임수: {user.gameCount}
      </div>
      <div className="flex-1">
        승률: {user.winRate}
        <br />
        승: {user.win}
        <br />
        패: {user.lose}
      </div>
      <div className="flex flex-col">
        <button onClick={() => onAdd(user)}>+</button>
        <button onClick={() => onDelete(user.id)}>-</button>
      </div>
    </div>
  );
};
export default UserCard;
