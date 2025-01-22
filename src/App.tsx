import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Team } from "./custom-components/team";
import { TeamSort } from "./custom-components/teamSorted";
import { Navbar } from "./custom-components/UI/navbar";
import { TeamRoster } from "./custom-components/team-roster/teamRoster";
function App() {
  const [data, setData] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const totalweeks = useRef(0);
  useEffect(() => {
    async function data() {
      // http://localhost:8000/team if running on local machine
      const url = await fetch("/teamAPI/team", {
        method: "GET",
      }).then((response) => response.json());
      setData(url);
      setLoaded(true);
    }
    data();
  }, []);
  if (data) {
    const newArray = data.map((weeks: any) => weeks.stats.gamesPlayed);
    totalweeks.current = Math.max(...Array.from(new Set(newArray)));
  }
  console.log(totalweeks);
  return (
    <>
      <div className="App">
        <Navbar />
        {loaded == false && "loading... hello"}
        <div>{loaded == true && <TeamSort data={data} />}</div>
        <br></br>
        <Routes>
          <Route
            path={"/"}
            element={
              "Please select a team to view the latest box score and standings"
            }
          ></Route>
          <Route
            path={`/team/:abbreviation`}
            element={<Team totalweeks={totalweeks.current} />}
          ></Route>
          <Route
            path={`/:abbreviation/roster`}
            element={<TeamRoster />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

// data.map((data) => <li key={data.team.id}><Link to={`/team/${data.team.abbreviation}`}>{data.team.city} {data.team.name}</Link></li>)
