import { ScoreTable } from "./scoreTable";

export function ScoreCard({ dataScore }: any) {
  const data = dataScore;
  return (
    <>
      <div>
        <p className="matchup-teams">
          <img
            src={`https://static.www.nfl.com/league/api/clubs/logos/${data[0].schedule.awayTeam.abbreviation}.svg`}
            className="boxscore-sizing"
          />{" "}
          {data[0].schedule.awayTeam.abbreviation} @{" "}
          {data[0].schedule.homeTeam.abbreviation}{" "}
          <img
            src={`https://static.www.nfl.com/league/api/clubs/logos/${data[0].schedule.homeTeam.abbreviation}.svg`}
            className="boxscore-sizing"
          />
        </p>
      </div>
      <ScoreTable dataScore={data} />
    </>
  );
}
