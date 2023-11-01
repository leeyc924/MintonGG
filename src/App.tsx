import { useState } from 'react';
import { LabelInput, TeamName } from '@components';

function App() {
  const [teamList, setTeamList] = useState([{ teamName: 'A', members: [''] }]);

  return (
    <div>
      {teamList.map((team, i) => (
        <div key={i} className="team">
          <TeamName>{team.teamName}</TeamName>
          <div className="team__member">
            {team.members.map((member, j) => (
              <LabelInput
                key={`${i}-${j}`}
                value={member}
                onChange={e => {
                  setTeamList(teamList =>
                    teamList.map((team, _i) =>
                      i === _i
                        ? { ...team, members: team.members.map((member, _j) => (j === _j ? e.target.value : member)) }
                        : team,
                    ),
                  );
                }}
                label="이름"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
