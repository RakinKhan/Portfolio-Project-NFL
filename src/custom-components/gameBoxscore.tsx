import { useEffect, useRef, useState } from "react";
import "./teamCard.css";
import { ScoreCard } from "./box-score/scoreCard";
import { WeekChange } from "./box-score/weekChange";
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
      loaded.current = true;
    }
    if (oldref.current != abbreviation) {
      data();
      oldref.current = abbreviation;
    }
  }, [abbreviation]);

  useEffect(() => {
    async function data() {
      const url = await fetch(
        `http://localhost:8000/boxscore/${weeksTotal}/${abbreviation}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      setData(url);
      loaded.current = true;
    }
    data();
  }, []);

  if (oldref.current != abbreviation) {
    loaded.current = false;
  }
  console.log(data);
  return (
    <>
      <div>
        <div>
          <WeekChange weeks={gameWeek} />
        </div>
        <div>
          <h3>Week {weeksTotal} Boxscore</h3>
        </div>
        <div>
          {loaded.current == false && "loading..."}
          {loaded.current == true && <ScoreCard dataScore={data} />}
        </div>
      </div>
    </>
  );
}
