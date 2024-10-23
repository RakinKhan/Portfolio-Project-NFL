import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TeamCard } from "./team-details/teamCard";

/* component fetches data for a selected team. the fetched team data is passed to TeamCard.tsx component for further processing to display. */
export function Team({ totalweeks }: any) {
  const { abbreviation } = useParams();
  const [data, setData] = useState<any>({});
  const loaded = useRef(false);
  const oldref = useRef(abbreviation);

  useEffect(() => {
    async function data() {
      const url = await fetch(`http://localhost:8000/team/${abbreviation}`, {
        method: "GET",
      }).then((response) => response.json());
      setData(url);
      loaded.current = true;
    }
    if (oldref.current !== abbreviation) {
      data();
      oldref.current = abbreviation;
    }
  }, [abbreviation]);

  useEffect(() => {
    async function data() {
      const url = await fetch(`http://localhost:8000/team/${abbreviation}`, {
        method: "GET",
      }).then((response) => response.json());
      setData(url);
      loaded.current = true;
    }
    data();
  }, []);
  if (oldref.current !== abbreviation) {
    loaded.current = false;
  }

  return (
    <div className="container">
      {loaded.current === false && "loading..."}
      <div>
        {loaded.current === true && (
          <div>{<TeamCard data={data} totalweeks={totalweeks} />}</div>
        )}
      </div>
    </div>
  );
}
