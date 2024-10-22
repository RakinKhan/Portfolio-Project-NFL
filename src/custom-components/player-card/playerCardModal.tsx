import "./playerCardModal.css";
import ReactDOM from "react-dom";
import { PlayerCardLeft } from "./pc-left/playerCardLeft";
import { PlayerCardRight } from "./pc-right/playerCardRight";
const modalStyles = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  border: "1px solid black",
};

const overlayStyles = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
};
export function PlayerCardModal({
  open,
  onClose,
  references,
  weeksPlayedTeam,
}: any) {
  if (!open) return null;

  return (
    <>
      <div style={overlayStyles} className="position-fixed" />
      <div style={modalStyles} className="position-fixed container">
        <div className="row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              onClick={onClose}
              className="btn btn-primary me-md-2"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
        <div className="row">
          <h1>{open.player.playerName}</h1>
        </div>
        <div className="row">
          <div className="col">
            <PlayerCardLeft player={open.player} />
          </div>
          <div className="col">
            <PlayerCardRight
              name={{
                firstName: open.player.playerNameFirst.replace(/[ '.-]/g, ""),
                lastName: open.player.playerNameLast.replace(/[ '.-]/g, ""),
              }}
              playerStats={open.player.stats}
              references={references}
              weeksPlayedTeam={weeksPlayedTeam}
            />
          </div>
        </div>
      </div>
    </>
  );
}
