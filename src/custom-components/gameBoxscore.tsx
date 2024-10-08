import { useEffect, useRef, useState } from "react";
import "./teamCard.css";
import { ScoreCard } from "./box-score/scoreCard";
import { WeekChange } from "./box-score/weekChange";
export function BoxScore({ gamesPlayed, teamAbbreviation }: any) {
  const weeksTotal = gamesPlayed;
  const abbreviation = teamAbbreviation;
  const gameWeek = [];
  const [data, setData] = useState<any>({});
  const [prevWeek, setPrevWeek] = useState(gamesPlayed);
  const loaded = useRef(false);
  const oldref = useRef(abbreviation);
  const oldweekref = useRef(prevWeek);
  for (let i = 0; i < weeksTotal; i++) {
    gameWeek.push(i + 1);
  }

  useEffect(() => {
    async function data() {
      const url = await fetch(
        `http://localhost:8000/boxscore/${prevWeek}/${abbreviation}`,
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
    if (oldweekref.current != prevWeek) {
      data();
      oldweekref.current = prevWeek;
    }
  }, [abbreviation, prevWeek]);

  useEffect(() => {
    async function data() {
      const url = await fetch(
        `http://localhost:8000/boxscore/${prevWeek}/${abbreviation}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      setData(url);
      loaded.current = true;
    }
    data();
  }, []);

  if (oldref.current != abbreviation || oldweekref.current != prevWeek) {
    loaded.current = false;
  }

  return (
    <>
      <div>
        <div>
          <WeekChange weeks={gameWeek} changeWeek={setPrevWeek} />
        </div>
        <div>
          <h3>Week {prevWeek} Boxscore</h3>
        </div>
        <div>
          {loaded.current == false && "loading..."}
          {loaded.current == true && <ScoreCard dataScore={data} />}
        </div>
      </div>
    </>
  );
}
