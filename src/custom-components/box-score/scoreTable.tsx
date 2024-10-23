/* Component displays the box score in table format, by quarters (Q1-Q4), and lastly the final score. */

export function ScoreTable({ dataScore }: any) {
  const data = dataScore;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Team</th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Q4</th>
            <th scope="col">Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data[0].schedule.awayTeam.abbreviation}</td>
            <td>{data[0].score.quarters[0].awayScore}</td>
            <td>{data[0].score.quarters[1].awayScore}</td>
            <td>{data[0].score.quarters[2].awayScore}</td>
            <td>{data[0].score.quarters[3].awayScore}</td>
            <td>
              {data[0].score.quarters
                .map((score: any) => score.awayScore)
                .reduce((quarter: any, currentValue: any) => {
                  return quarter + currentValue;
                }, 0)}
            </td>
          </tr>
          <tr>
            <td>{data[0].schedule.homeTeam.abbreviation}</td>
            <td>{data[0].score.quarters[0].homeScore}</td>
            <td>{data[0].score.quarters[1].homeScore}</td>
            <td>{data[0].score.quarters[2].homeScore}</td>
            <td>{data[0].score.quarters[3].homeScore}</td>
            <td>
              {data[0].score.quarters
                .map((score: any) => score.homeScore)
                .reduce((quarter: any, currentValue: any) => {
                  return quarter + currentValue;
                }, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
