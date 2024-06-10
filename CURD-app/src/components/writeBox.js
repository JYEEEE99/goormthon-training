import React from "react";

function WriteBox({
  use,
  expense,
  onUseChange,
  onExpenseChange,
  onCreateClick,
  isEditing,
  onSaveEdit,
}) {
  return (
    <div className="write__box">
      <p>지출 항목</p>
      <input
        type="text"
        placeholder="예) 택시비"
        onChange={onUseChange}
        value={use}
      />
      <p>비용</p>
      <input
        type="number"
        placeholder="예) 6300"
        onChange={onExpenseChange}
        value={expense}
      />
      <div>
        {!isEditing ? (
          <button className="create__btn" onClick={onCreateClick}>
            제출
          </button>
        ) : (
          <button className="create__btn" onClick={onSaveEdit}>
            수정
          </button>
        )}
      </div>
    </div>
  );
}

export default WriteBox;
