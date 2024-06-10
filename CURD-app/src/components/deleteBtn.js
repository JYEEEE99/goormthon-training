import React from "react";

function DeleteBtn({ onClearAll }) {
  return (
    <div>
      <button className="clear__btn" onClick={onClearAll}>
        목록삭제
      </button>
    </div>
  );
}

export default DeleteBtn;
