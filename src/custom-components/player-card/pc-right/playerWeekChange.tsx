export function PlayerWeekChange({ played, changeWeek }: any) {
  const weekDropdown = [...Array(played)];
  const chooseWeek = [];

  for (let i = 0; i < weekDropdown.length; i++) {
    if (i + 1 !== weekDropdown[weekDropdown.length - 1]) {
      chooseWeek.push(<option value={i + 1}>{i + 1}</option>);
    } else {
      chooseWeek.push(<option value={i + 1}>{i + 1}</option>);
    }
  }
  chooseWeek.push(
    <option value={"all"} selected>
      All
    </option>
  );
  const weekChangeHandler = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    return changeWeek(value);
  };
  return (
    <>
      <div className="text-end">
        <label htmlFor="nfl-week">Week:</label>{" "}
        <select name="nfl-week" onChange={weekChangeHandler}>
          {chooseWeek}
        </select>
      </div>
    </>
  );
}
