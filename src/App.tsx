import React, { Component } from "react";
import "./App.css";
import TodoItems from "./components/TodoItems";
import { Item } from "./models";

interface State {
  todoListItems: Array<Item>;
}
export default class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoListItems: [
        { title: "Đi mua sữa", isComplete: true },
        { title: "Dắt chó đi dạo", isComplete: false },
        { title: "Chơi một vài ván game", isComplete: false },
      ],
    };
  }

  toggleCompleteByIndex(idx: number) {
    return () => {
      const { todoListItems } = Object.assign(this.state);
      let item = todoListItems[idx];
      item.isComplete = !item.isComplete;
      this.setState({
        todoListItems: [
          ...todoListItems.slice(0, idx),
          { ...item },
          ...todoListItems.slice(idx + 1),
        ],
      });
    };
  }
  
  render() {
    return (
      <div className="App">
        {this.state.todoListItems &&
          this.state.todoListItems.map((item, idx) => (
            <TodoItems
              key={idx}
              item={item}
              toggleState={this.toggleCompleteByIndex(idx)}
            />
          ))}
      </div>
    );
  }
}
