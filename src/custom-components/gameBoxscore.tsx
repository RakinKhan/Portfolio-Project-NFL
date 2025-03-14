import { useEffect, useRef, useState, useContext } from "react";
import "./teamCard.css";
import { ScoreCard } from "./box-score/scoreCard";
import { WeekChange } from "./box-score/weekChange";

/* Shows the box score of a selected team and their opponents. Initially will show the box score of the latest matchup. dropdown will let you see previous box scores during the season */
export function BoxScore({ gamesPlayed, teamAbbreviation, totalweeks }: any) {
  const [weeksTotal, setWeeksTotal] = useState<any>(totalweeks);
  const abbreviation = teamAbbreviation;
  const gameWeek = [];
  const [data, setData] = useState<any>({});
  const [prevWeek, setPrevWeek] = useState(totalweeks);
  const loaded = useRef(false);
  const oldref = useRef(abbreviation);
  const oldweekref = useRef(prevWeek);
  const isByeWeek = useRef(1);
  for (let i = 0; i < weeksTotal; i++) {
    gameWeek.push(i + 1);
  }
  console.log(totalweeks);
  console.log(gameWeek);
  useEffect(() => {
    async function data() {
      // http://localhost:8000/
      const url = await fetch(
        `http://localhost:8000/boxscore/${prevWeek}/${abbreviation}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      if (url[0]?.score === undefined) {
        setData({
          stats: "none",
          reason: "bye week",
        });
        isByeWeek.current = 3;
      }
      if (url[0]?.score) {
        setData(url);
        isByeWeek.current = 1;
      }
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
      // http://localhost:8000/
      const url = await fetch(
        `http://localhost:8000/boxscore/${prevWeek}/${abbreviation}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      if (url[0]?.score === undefined) {
        setData({
          stats: "none",
          reason: "bye week",
        });
        isByeWeek.current = 3;
      }
      if (url[0]?.score) {
        setData(url);
        isByeWeek.current = 1;
      }
      loaded.current = true;
    }

    async function check() {
      const url = await fetch(
        // http://localhost:8000/
        `http://localhost:8000/boxscore/${prevWeek + 1}/${abbreviation}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      if (url[0]?.score) {
        setWeeksTotal(prevWeek + 1);
        setData(url);
        const week = prevWeek + 1;
        setPrevWeek(week);
        isByeWeek.current = 1;
      } else {
        data();
      }
      loaded.current = true;
    }
    check();
  }, []);
  console.log(gameWeek);
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
          {isByeWeek.current == 3 && "bye week"}
          {loaded.current == true && isByeWeek.current == 1 && (
            <ScoreCard dataScore={data} />
          )}
        </div>
      </div>
    </>
  );
}
