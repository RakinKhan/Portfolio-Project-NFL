/* Displays stats for the selected category in table format. */

export function PlayerStatsDisplay({ selected }: any) {
  const grouping = selected.grouping;
  if (selected.name == "none") {
    return (
      <>
        <div>{selected.grouping}</div>
      </>
    );
  }
  if (selected.name == "DNP") {
    return (
      <>
        <div>{selected.grouping}</div>
      </>
    );
  }
  return (
    <>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th colSpan={2}>
              <h6>{selected.name}</h6>
            </th>
          </tr>
        </thead>
        <tbody>
          {grouping.map((group: any) => {
            return (
              <>
                <tr>
                  <th scope="row">{group.description}:</th>
                  <td scope="row">{group.value}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
