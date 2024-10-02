export function WeekChange({ weeks }: any) {
  const weekDropdown = weeks;
  const chooseWeek = [];
  console.log(weeks);
  for (let i = 0; i < weekDropdown.length; i++) {
    if (i + 1 !== weekDropdown[weekDropdown.length - 1]) {
      chooseWeek.push(<option value={i + 1}>{i + 1}</option>);
    } else {
      chooseWeek.push(
        <option value={i + 1} selected>
          {i + 1}
        </option>
      );
    }
  }
  console.log(chooseWeek);
  return (
    <div className="text-end">
      <label htmlFor="nfl-week">Week:</label>{" "}
      <select name="nfl-week">{chooseWeek}</select>
    </div>
  );
}
