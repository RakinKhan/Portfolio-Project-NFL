import { useEffect, useRef, useState } from "react";
import "../teamCard.css";
import { useParams, useLocation } from "react-router-dom";
import { PositionBreakdown } from "./positionBreakdown";

export function TeamRoster() {
  const { abbreviation } = useParams();
  const [data, setData] = useState<any>({});
  const location = useLocation();
  const dataTeam = location.state;

  const loaded = useRef(false);
  const oldref = useRef(abbreviation);
  useEffect(() => {
    async function data() {
      const url = await fetch(`http://localhost:8000/${abbreviation}/roster`, {
        method: "GET",
      }).then((response) => response.json());
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
      const url = await fetch(`http://localhost:8000/${abbreviation}/roster`, {
        method: "GET",
      }).then((response) => response.json());
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
      <div className="container">
        <div className="row">
          <h1>
            {dataTeam.state.name}
            <img
              src={dataTeam.state.image}
              className="logo-sizing"
              alt="team logo"
            />
          </h1>
        </div>
        <div className="row">
          <h3>2024-2025 Roster</h3>
        </div>
      </div>
      <div className="container">
        {loaded.current == false && "loading..."}
        <div>
          {loaded.current == true && (
            <div>{<PositionBreakdown players={data} />}</div>
          )}
        </div>
      </div>
    </>
  );
}
