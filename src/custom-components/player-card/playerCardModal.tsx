import "./playerCardModal.css";
import ReactDOM from "react-dom";

const modalStyles = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};
export function PlayerCardModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <>
      <div style={modalStyles} className="position">
        <button onClick={onClose}>hi</button>
        {open.player.playerName}
      </div>
    </>
  );
}
