import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TeamCard } from "./teamCard";
export function Team() {
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
    if (oldref.current != abbreviation) {
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
  if (oldref.current != abbreviation) {
    loaded.current = false;
  }
  console.log(abbreviation);
  console.log(data);
  return (
    <div className="container">
      {loaded.current == false && "loading..."}
      <div>
        {loaded.current == true && <div>{<TeamCard data={data} />}</div>}
      </div>
    </div>
  );
}
