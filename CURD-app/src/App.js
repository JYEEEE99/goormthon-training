import { useEffect, useState } from "react";
import "./App.css";
import ItemList from "./components/itemList";
import WriteBox from "./components/writeBox";
import DeleteBtn from "./components/deleteBtn";
import Message from "./components/message";

function App() {
  const [use, setUse] = useState("");
  const [expense, setExpense] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [message, setMessage] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + Number(item.expense), 0);
    setTotalExpense(total);
  }, [items]);

  const handleUseChange = (e) => {
    setUse(e.target.value);
  };

  const handleExpenseChange = (e) => {
    setExpense(e.target.value);
  };

  const handleCreateClick = () => {
    const newItem = { use, expense };
    setItems([newItem, ...items]);
    setUse("");
    setExpense("");
    showMessage("새로운 목록이 추가되었습니다.");
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditItem({ index, ...items[index] });
    setUse(items[index].use);
    setExpense(items[index].expense);
  };

  const handleSaveEdit = () => {
    const updatedItems = items.map((item, index) =>
      index === editItem.index ? { use, expense } : item
    );
    setItems(updatedItems);
    setIsEditing(false);
    setEditItem(null);
    setUse("");
    setExpense("");
    showMessage("목록이 수정되었습니다.");
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    showMessage("목록이 삭제되었습니다.");
  };

  const handleClearAllItems = () => {
    setItems([]);
    showMessage("모든 목록이 삭제되었습니다.");
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="App">
      {message && <Message message={message} onClose={() => setMessage("")} />}
      <h1 className="title" style={{ marginTop: "60px" }}>
        예산 계산기
      </h1>
      <WriteBox
        use={use}
        expense={expense}
        onUseChange={handleUseChange}
        onExpenseChange={handleExpenseChange}
        onCreateClick={handleCreateClick}
        isEditing={isEditing}
        onSaveEdit={handleSaveEdit}
      />
      <ItemList
        items={items}
        onEditClick={handleEditClick}
        onRemoveClick={handleRemoveItem}
      />
      <div className="total__box">
        <DeleteBtn onClearAll={handleClearAllItems} />
        <p>총액: {totalExpense}</p>
      </div>
    </div>
  );
}

export default App;
