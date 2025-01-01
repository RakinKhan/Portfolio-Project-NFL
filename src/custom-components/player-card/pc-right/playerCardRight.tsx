import { PlayerStatsDisplay } from "./playerStatsDisplay";
import { useEffect, useState, useRef } from "react";
import { PlayerWeekChange } from "./playerWeekChange";
import "./playerCardRight.css";
/* 
Component displays the selected player stats. Initially the total stats for the season will be viewable.
Given theamount of stats available, stats are sorted into categories and will only be viewable once a 
category has been picked. Due to player positions, certain statistical categories will not apply and so those
categories will be ommitted from selection. For situations where a player did not play, a "Did Not Participate"
notice will be displayed on screen.
*/
const categories = [
  "Passing",
  "Rushing",
  "Receiving",
  "Tackles",
  "Interceptions",
  "Fumbles",
  "Kickoff Returns",
  "Punt Returns",
  "Field Goals",
  "Kickoffs",
  "Punting",
  "2PT",
  "Tackles",
  "Snap Counts",
  "Fumbles",
];

export function PlayerCardRight({
  name,
  playerStats,
  references,
  weeksPlayedTeam,
}: any) {
  const [statSelected, setStatSelected] = useState({
    name: "none",
    grouping: "please select a group",
  });
  const playerStatsOriginal = playerStats;
  const [playerStatsChange, setPlayerStats] = useState(playerStats);
  const [week, setWeek] = useState("all");
  const listOfCategories: any = [];
  const grouped: any = [];
  const groupedOrganized: any = [];
  const loaded = useRef(false);
  const isDNP = useRef(1);
  const statsList: any = {
    Passing: {
      stats: playerStatsChange.passing,
    },
    Rushing: {
      stats: playerStatsChange.rushing,
    },
    Receiving: {
      stats: playerStatsChange.receiving,
    },
    Interceptions: {
      stats: playerStatsChange.interceptions,
    },
    "Kickoff Returns": {
      stats: playerStatsChange.kickoffReturns,
    },
    "Punt Returns": {
      stats: playerStatsChange.puntReturns,
    },
    "Field Goals": {
      stats: playerStatsChange.FieldGoals,
    },
    Kickoffs: {
      stats: playerStatsChange.kickoffs,
    },
    Punting: {
      stats: playerStatsChange.punting,
    },
    "2PT": {
      stats: playerStatsChange.twoPointAttempts,
    },
    Tackles: {
      stats: playerStatsChange.tackles,
    },
    "Snap Counts": {
      stats: playerStatsChange.snapCounts,
    },
    Fumbles: {
      stats: playerStatsChange.fumbles,
    },
  };

  categories.forEach((category: any) => {
    const categoryFiltered = references.filter(
      (refCat: any) => refCat.category === category
    );
    listOfCategories.push({
      category: category,
      categoryFiltered: categoryFiltered,
    });
  });
  listOfCategories.forEach((category: any) => {
    const categoryName = category.category;
    if (statsList[`${categoryName}`].stats != undefined) {
      grouped.push({
        categoryName: categoryName,
        category: category.categoryFiltered,
        stats: statsList[`${categoryName}`].stats,
      });
    }
  });

  grouped.forEach((grouping: any) => {
    const categoryName = grouping.categoryName;
    const finalGrouping: any = [];
    grouping.category.forEach((attribute: any) => {
      finalGrouping.push({
        abbreviation: attribute.abbreviation,
        description: attribute.description,
        value: grouping.stats[`${attribute.fullName}`],
      });
    });
    groupedOrganized.push({
      name: categoryName,
      grouping: finalGrouping,
    });
  });

  useEffect(() => {
    console.log(week);
    async function data() {
      const url = await fetch(
        `http://localhost:8000/${name.firstName}-${name.lastName}/${week}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      if (url[0]?.stats === undefined) {
        setPlayerStats("DNP");
        setStatSelected({
          name: "DNP",
          grouping: "Did not Participate",
        });
        isDNP.current = 2;
      }
      if (url[0]?.stats) {
        setPlayerStats(url[0].stats);
        setStatSelected({
          name: "none",
          grouping: "please select a group",
        });
        isDNP.current = 3;
      }
      loaded.current = true;
    }
    if (week != "all") {
      loaded.current = false;
      data();
    }
    if (week === "all") {
      loaded.current = false;
      isDNP.current = 3;
      setPlayerStats(playerStats);
      setStatSelected({
        name: "none",
        grouping: "please select a group",
      });
    }
  }, [week]);

  if (playerStatsOriginal === playerStatsChange) {
    loaded.current = true;
  }

  return (
    <>
      <div>
        <h6>Season Stats</h6>
      </div>
      <div className="row">
        <div>Games Played: {playerStats.gamesPlayed}</div>
        <PlayerWeekChange played={weeksPlayedTeam} changeWeek={setWeek} />
      </div>
      <div className="container-fluid d-flex column-gap-3">
        <div className="btn-group-vertical row p-2">
          {groupedOrganized.map((group: any) => (
            <button
              type="button"
              className="btn button-style"
              onClick={() => setStatSelected(group)}
            >
              {group.name}
            </button>
          ))}
        </div>
        <div className="row p-2 flex-grow-1">
          {loaded.current == false && "loading..."}
          {isDNP.current == 2 && <PlayerStatsDisplay selected={statSelected} />}
          {loaded.current == true && isDNP.current == 3 && (
            <PlayerStatsDisplay selected={statSelected} />
          )}
        </div>
      </div>
    </>
  );
}
