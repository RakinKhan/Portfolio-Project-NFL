import { PlayerCardModal } from "../player-card/playerCardModal";
import { useState } from "react";

/* 
Component groups the players by their position and makes each player into a clickable button. 
When players name is clicked a modal is opened to show the specific players info and stats.
*/
export function PositionBreakdown({ players, weeksPlayedTeam }: any) {
  const [isOpen, setIsOpen] = useState({ open: false, player: {} });
  const positionList: Array<string> = [];
  const positionalGrouping: Array<Object> = [];
  const playerAll = players["statsTotal"];
  const statReferences = players["references"];
  const playersList = playerAll.map((player: any) => {
    return {
      playerName: `${player.player.firstName} ${player.player.lastName}`,
      image: player.player.officialImageSrc,
      position: player.player.primaryPosition,
      jersey: player.player.jerseyNumber,
      stats: player.stats,
      playerNameFirst: player.player.firstName,
      playerNameLast: player.player.lastName,
    };
  });
  playersList.forEach((player: any) => {
    if (!positionList.includes(player.position)) {
      positionList.push(player.position);
    }
  });

  positionList.forEach((position: any) => {
    const filtered = playersList.filter(
      (positionPlayer: any) => positionPlayer.position === position
    );
    positionalGrouping.push({
      position: position,
      players: filtered,
    });
  });

  return (
    <div>
      {positionalGrouping.map((group: any) => {
        return (
          <div className="container row">
            <div className="col">
              <div className="float-start">{group.position} -</div>
              {group.players.map((player: any) => {
                return (
                  <div className="float-start">
                    <button
                      className="btn btn-dark"
                      style={{
                        padding: "0 5px",
                        height: "fit-content",
                        margin: "1px 2.5px",
                      }}
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
          references={statReferences}
          weeksPlayedTeam={weeksPlayedTeam}
        ></PlayerCardModal>
      )}
    </div>
  );
}
