import React from "react";

function ItemList({ items, onEditClick, onRemoveClick }) {
  return (
    <div className="item__list">
      {items.map((item, index) => (
        <div className="item" key={index}>
          <p>{item.use}</p>
          <p>{item.expense}</p>
          <button onClick={() => onEditClick(index)}>edit</button>
          <button onClick={() => onRemoveClick(index)}>remove</button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
