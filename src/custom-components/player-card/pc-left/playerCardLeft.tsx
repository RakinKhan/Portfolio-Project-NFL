export function PlayerCardLeft({ player }: any) {
  return (
    <>
      <div>
        <img src={player.image} alt="player image"></img>
        <p>
          Position: {player.position}
          <br></br>
          Jersey: {player.jersey}
        </p>
      </div>
    </>
  );
}
