import { PlayerCardModal } from "../player-card/playerCardModal";
import { useState } from "react";
export function PositionBreakdown({ players }: any) {
  const [isOpen, setIsOpen] = useState({ open: false, player: {} });
  const positionList: Array<string> = [];
  const positionalGrouping: Array<Object> = [];
  const playersList = players.map((player: any) => {
    return {
      playerName: `${player.player.firstName} ${player.player.lastName}`,
      image: player.player.officialImageSrc,
      position: player.player.primaryPosition,
      jersey: player.player.jerseyNumber,
      stats: player.stats,
    };
  });
  playersList.forEach((player: any) => {
    if (!positionList.includes(player.position)) {
      positionList.push(player.position);
    }
  });

  positionList.forEach((position: any) => {
    const filtered = playersList.filter(
      (positionPlayer: any) => positionPlayer.position == position
    );
    positionalGrouping.push({
      position: position,
      players: filtered,
    });
  });
  console.log(isOpen);
  return (
    <div>
      {positionalGrouping.map((group: any) => {
        return (
          <div className="container row">
            <div className="col">
              <h6 className="float-start">{group.position} -</h6>
              {group.players.map((player: any) => {
                return (
                  <div className="float-start" style={{ padding: "0 10px" }}>
                    <button
                      onClick={() =>
                        setIsOpen({
                          open: true,
                          player: player,
                        })
                      }
                    >
                      {player.playerName}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {isOpen.open && (
        <PlayerCardModal
          open={isOpen}
          onClose={() => setIsOpen({ open: false, player: {} })}
        ></PlayerCardModal>
      )}
    </div>
  );
}
