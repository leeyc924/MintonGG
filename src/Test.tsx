import { useCallback, useEffect, useMemo, useState } from 'react';
import algorithm from './algorithm';
import { userList as initUserList } from '@db';
import { GameUser } from '@types';
import { TIER_COLOR } from '@constants';
import { UserCard, Accordion } from '@components';

function Test() {
  const initGameUserList = useMemo<GameUser[]>(() => {
    return initUserList.map(user => ({ ...user, gameCount: 0, winRate: 0, win: 0, lose: 0 }));
  }, []);
  const [gameUserList, setGameUserList] = useState<GameUser[]>(initGameUserList);
  const sortGameUserList = useMemo<GameUser[]>(
    () => gameUserList.sort((l, r) => (l.tier > r.tier ? 1 : l.tier < r.tier ? -1 : 0)),
    [gameUserList],
  );
  // const [gameList, setGameList] = useState<Game[]>([]);

  useEffect(() => {
    algorithm();
    return () => {};
  }, []);

  const handleSelect = useCallback((user: GameUser) => {
    setGameUserList(gameUserList => {
      if (gameUserList.some(selectedUser => selectedUser.id === user.id)) {
        return gameUserList.filter(selectedUser => selectedUser.id !== user.id);
      }

      return gameUserList.concat(user);
    });
  }, []);

  const handleAddGame = useCallback(() => {
    //   console.log(gameList);
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full">
      <Accordion title="유저목록">
        <div className="flex gap-3 flex-wrap">
          {initGameUserList.map(user => (
            <button
              key={user.id}
              className={`flex items-center rounded-lg ${TIER_COLOR[user.tier].border} border border-solid p-1 ${
                gameUserList.some(selectedUser => selectedUser.id === user.id)
                  ? `${TIER_COLOR[user.tier].background} text-white`
                  : 'bg-white text-gray-600'
              }`}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </Accordion>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col border-r-2 border-solid border-gray-500">
          <div className="text-center border-b-2 border-solid border-gray-500 p-2">경기</div>
          {/* <div className="flex flex-wrap gap-2 p-2">
            {gameList.map((game, index) => (
              <div key={index} className="flex items-center">
                <div>{index} 경기</div>
                <div>{game.score}</div>
                <div>
                  {game.teamA.map(user => (
                    <Fragment key={user.id}>{user.name}</Fragment>
                  ))}
                </div>
                vs
                <div>
                  {game.teamB.map(user => (
                    <Fragment key={user.id}>{user.name}</Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="text-center border-b-2 border-solid border-gray-500 p-2">참여유저</div>
          <div className="flex flex-wrap gap-2 p-2 overflow-y-auto">
            {sortGameUserList.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onAdd={() => console.log('add')}
                onDelete={() => console.log('delte')}
              />
            ))}
          </div>
          <button className="border-solid border-t-2 border-b-2 border-gray-500 p-2 mt-auto" onClick={handleAddGame}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
