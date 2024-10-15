import { platform } from "os";

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

export function PlayerCardRight({ playerStats, references }: any) {
  const listOfCategories: any = [];
  const grouped: any = [];
  const groupedOrganized: any = [];
  const statsList: any = {
    Passing: {
      stats: playerStats.passing,
    },
    Rushing: {
      stats: playerStats.rushing,
    },
    Receiving: {
      stats: playerStats.receiving,
    },
    Interceptions: {
      stats: playerStats.interceptions,
    },
    "Kickoff Returns": {
      stats: playerStats.kickoffReturns,
    },
    "Punt Returns": {
      stats: playerStats.puntReturns,
    },
    "Field Goals": {
      stats: playerStats.FieldGoals,
    },
    Kickoffs: {
      stats: playerStats.kickoffs,
    },
    Punting: {
      stats: playerStats.punting,
    },
    "2PT": {
      stats: playerStats.twoPointAttempts,
    },
    Tackles: {
      stats: playerStats.tackles,
    },
    "Snap Counts": {
      stats: playerStats.snapCounts,
    },
    Fumbles: {
      stats: playerStats.fumbles,
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
      console.log("Yes", `${categoryName}`);
    } else {
      console.log("NO", `${categoryName}`);
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

  console.log(groupedOrganized);
  return (
    <>
      <div>
        <h6>Season Stats</h6>
      </div>
      <div>Games Played: {playerStats.gamesPlayed}</div>
      <div className="container-fluid">
        <div
          className="btn-group-vertical float-start row"
          style={{ width: "fit-content" }}
        >
          {groupedOrganized.map((group: any) => (
            <button type="button" className="btn">
              {group.name}
            </button>
          ))}
        </div>
        <div className="row">select a stat</div>
      </div>
    </>
  );
}
