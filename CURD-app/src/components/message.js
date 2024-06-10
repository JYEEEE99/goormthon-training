import React from "react";

function Message({ message, onClose }) {
  return (
    <div className="message">
      {message}
      <button onClick={onClose} style={{ marginLeft: "10px" }}>
        X
      </button>
    </div>
  );
}

export default Message;
