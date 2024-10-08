import { Link } from "react-router-dom";

export function TeamSort({ data }: any) {
  const conferenceSplit: Array<Object> = [];
  const confSort = ["AFC", "NFC"];

  const conferenceSort = function (data: any) {
    for (let i = 0; i < confSort.length; i++) {
      const east: any = [];
      const north: any = [];
      const south: any = [];
      const west: any = [];
      const conferenceName = confSort[i];
      const confFiltered = data.filter((team: any) => {
        return team.conferenceRank.conferenceName === conferenceName;
      });
      confFiltered.forEach((team: any) => {
        if (team.divisionRank.divisionName === `${conferenceName} West`) {
          west.push(team);
        } else if (
          team.divisionRank.divisionName === `${conferenceName} South`
        ) {
          south.push(team);
        } else if (
          team.divisionRank.divisionName === `${conferenceName} East`
        ) {
          east.push(team);
        } else if (
          team.divisionRank.divisionName === `${conferenceName} North`
        ) {
          north.push(team);
        } else {
        }
      });
      conferenceSplit.push({
        Conference: `${conferenceName}`,
        West: west,
        East: east,
        South: south,
        North: north,
      });
    }
  };
  conferenceSort(data);

  return (
    <>
      <div className="container text-center">
        {conferenceSplit.map((conference: any) => {
          const east: Array<object> = conference.East;
          const north: Array<object> = conference.North;
          const south: Array<object> = conference.South;
          const west: Array<object> = conference.West;
          const allConf = [east, north, south, west];
          const all = allConf.map((division: any) => {
            return division.map((teams: any) => {
              return (
                <div className="row">
                  <div className="row" key={teams.team.id}>
                    <Link to={`/team/${teams.team.abbreviation}`}>
                      {teams.team.city} {teams.team.name}
                    </Link>
                  </div>
                </div>
              );
            });
          });
          return (
            <>
              <div className="row">
                {all.map((div: any) => {
                  return (
                    <div className="col">
                      <br></br>
                      {div}
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

/*
        const nfcTeams = data.filter((team:any ) => {
            return team.conferenceRank.conferenceName === "NFC"
        })

        nfcTeams.forEach((team:any) => {
            if (team.divisionRank.divisionName === "NFC West") {
                west.push(team)
            } else if (team.divisionRank.divisionName === "NFC South") {
                south.push(team)
            } else if(team.divisionRank.divisionName === "NFC East") {
                east.push(team)
            } else if(team.divisionRank.divisionName === "NFC North") {
                north.push(team)
            }
        })

*/
