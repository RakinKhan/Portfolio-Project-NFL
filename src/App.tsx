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
function App() {
  const [data, setData] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function data() {
      const url = await fetch("http://localhost:8000/team", {
        method: "GET",
      }).then((response) => response.json());
      setData(url);
      setLoaded(true);
    }
    data();
  }, []);
  return (
    <>
      <div className="App">
        <Navbar />
        {loaded == false && "loading... hello"}
        <ul>{loaded == true && <TeamSort data={data} />}</ul>
        <Routes>
          <Route path={`/team/:abbreviation`} element={<Team />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

// data.map((data) => <li key={data.team.id}><Link to={`/team/${data.team.abbreviation}`}>{data.team.city} {data.team.name}</Link></li>)
