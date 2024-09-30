import { useEffect, useRef, useState } from "react";

export function BoxScore({ gamesPlayed, teamAbbreviation }: any) {
  const weeksTotal = gamesPlayed;
  const abbreviation = teamAbbreviation;
  const gameWeek = [];
  const [data, setData] = useState<any>({});
  const loaded = useRef(false);
  const oldref = useRef(abbreviation);
  for (let i = 0; i < weeksTotal; i++) {
    gameWeek.push(i + 1);
  }

  useEffect(() => {
    async function data() {
      const url = await fetch(
        `http://localhost:8000/boxscore/${weeksTotal}/${abbreviation}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      setData(url);
    }
    data();
  }, []);
  console.log(data);
  return (
    <>
      <ul>
        <li>
          <h3>Week {weeksTotal} Boxscore</h3>
        </li>
      </ul>
    </>
  );
}
