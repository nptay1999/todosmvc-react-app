import React, { useState } from "react";
import "./TodoInput.css";
import done from "../assets/done.svg";
import { Item } from "../models";

interface Props {
  addTodoItem: (item: Item) => void;
  completeAll: () => void;
}

export default function TodoInput(props: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const { addTodoItem, completeAll } = props;

  const _onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const { key } = event;
    if (key === "Enter") {
      const value = inputValue.trim();
      if (!value) return;
      addTodoItem({ title: value, isComplete: false });
      setInputValue("");
    }
  };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className="todo-input">
      <img onClick={completeAll} src={done} alt="icon" width={32} />
      <input
        type="text"
        value={inputValue}
        placeholder="What needs to be done?"
        onKeyDown={_onKeyDown}
        onChange={_onChange}
      />
    </div>
  );
}
