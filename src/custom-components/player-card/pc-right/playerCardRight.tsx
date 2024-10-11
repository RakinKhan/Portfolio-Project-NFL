export function PlayerCardRight({ playerStats }: any) {
  return (
    <>
      <div>
        <h6>Season Stats</h6>
      </div>
      <div>Games Played: {playerStats.gamesPlayed}</div>
    </>
  );
}
