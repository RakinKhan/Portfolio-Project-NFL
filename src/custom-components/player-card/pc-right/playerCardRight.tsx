import { PlayerStatsDisplay } from "./playerStatsDisplay";
import { useEffect, useState, useRef } from "react";
import { PlayerWeekChange } from "./playerWeekChange";
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
  const [week, setWeek] = useState();
  const listOfCategories: any = [];
  const grouped: any = [];
  const groupedOrganized: any = [];

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

  console.log(playerStatsChange);
  console.log(playerStats);
  return (
    <>
      <div>
        <h6>Season Stats</h6>
      </div>
      <div className="row">
        <div>Games Played: {playerStats.gamesPlayed}</div>
        <PlayerWeekChange played={weeksPlayedTeam} changeWeek={setWeek} />
      </div>
      <div className="container-fluid">
        <div
          className="btn-group-vertical float-start row"
          style={{ width: "fit-content" }}
        >
          {groupedOrganized.map((group: any) => (
            <button
              type="button"
              className="btn"
              onClick={() => setStatSelected(group)}
            >
              {group.name}
            </button>
          ))}
        </div>
        <div className="row">
          <PlayerStatsDisplay selected={statSelected} />
        </div>
      </div>
    </>
  );
}
