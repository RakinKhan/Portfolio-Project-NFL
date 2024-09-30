import "./teamCard.css";
import { BoxScore } from "./gameBoxscore";
export function TeamCard({ data }: any) {
  const teamdata = data;
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>
            {teamdata.team.city} {teamdata.team.name}
            <img
              src={teamdata.team.officialLogoImageSrc}
              className="logo-sizing"
              alt="team logo"
            />
          </h1>
          <div className="row">
            <div className="col">
              <ul>
                <li>
                  <h3>2024-2025</h3>
                </li>
                <li>Stadium: {teamdata.team.homeVenue.name}</li>
                <li>Conference: {teamdata.conferenceRank.conferenceName}</li>
                <li>Conference Rank: {teamdata.conferenceRank.rank}</li>
                <li>Division: {teamdata.divisionRank.divisionName}</li>
                <li>Division Rank: {teamdata.divisionRank.rank}</li>
              </ul>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Win</th>
                    <th scope="col">Loss</th>
                    <th scope="col">Tie</th>
                    <th scope="col">Win %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{teamdata.stats.standings.wins}</td>
                    <td>{teamdata.stats.standings.losses}</td>
                    <td>{teamdata.stats.standings.ties}</td>
                    <td>
                      {Math.round(
                        teamdata.stats.standings.winPct * 100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col">
              <div className="container">
                {
                  <BoxScore
                    gamesPlayed={teamdata.stats.gamesPlayed}
                    teamAbbreviation={teamdata.team.abbreviation}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
