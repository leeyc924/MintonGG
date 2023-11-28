const UserPage = () => {
  // const sortUserList = useMemo(() => userList.sort((l, r) => (l.tier > r.tier ? 1 : l.tier < r.tier ? -1 : 0)), []);

  return (
    <div className="flex-1">
      <div className="flex border border-solid sticky top-0 left-0">
        <div className="p-2 flex-1 text-center bg-slate-200 border-r-[1px] border-solid">티어</div>
        <div className="p-2 flex-1 text-center bg-slate-200 border-r-[1px] border-solid">이름</div>
        <div className="p-2 flex-1 text-center bg-slate-200">성별</div>
      </div>
      <div className="flex flex-col flex-1">
        {/* {sortUserList.map(user => (
          <div key={user.id} className="flex items-center border-b-[1px] border-solid">
            <div className={`p-2 flex-1 text-center ${TIER_COLOR[user.tier].background} border-r-[1px] border-solid`}>
              {user.tier === 99 ? '??' : user.tier}
            </div>
            <div className={`p-2 flex-1 text-center ${TIER_COLOR[user.tier].background} border-r-[1px] border-solid`}>
              {user.name}
            </div>
            <div className={`p-2 flex-1 text-center ${TIER_COLOR[user.tier].background}`}>
              {user.gender === 'F' ? '여자' : '남자'}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default UserPage;
