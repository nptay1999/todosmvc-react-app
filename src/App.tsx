import React from "react";
import "./App.css";
import TodoFooter from "./components/TodoFooter";
import TodoInput from "./components/TodoInput";
import TodoItems from "./components/TodoItems";
import { ToggleAllComplete } from "./helpers";
import { Filter, Item } from "./models";

interface State {
  todoListItems: Array<Item>;
  filterListItems: Array<Item>;
  filter: Filter;
  numberItemsLeft: number;
}
export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoListItems: [],
      filterListItems: [],
      filter: Filter.All,
      numberItemsLeft: 0,
    };
    this.addNewItem = this.addNewItem.bind(this);
    this.isCompleteAll = this.isCompleteAll.bind(this);
    this.filterList = this.filterList.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  componentDidMount() {
    // get data from localstorage if it is in there.
    const todoListItemsString = localStorage.getItem('todoListItems');

    if (todoListItemsString) {
      const todoListItemParsed: Array<Item> = JSON.parse(todoListItemsString);

      const numItemLeft = todoListItemParsed.filter(
        (item) => !item.isComplete
      ).length;

      this.setState({
        todoListItems: todoListItemParsed,
        filterListItems: todoListItemParsed,
        numberItemsLeft: numItemLeft,
      });
    }
  }

  componentDidUpdate() {
    const todoListItemsString = JSON.stringify(this.state.todoListItems);
    localStorage.setItem('todoListItems', todoListItemsString);
  }

  toggleCompleteByIndex(idx: number) {
    return () => {
      const { todoListItems, numberItemsLeft, filter } = this.state;
      let item = todoListItems[idx];
      item.isComplete = !item.isComplete;
      const nil = item.isComplete ? numberItemsLeft - 1 : numberItemsLeft + 1;
      this.setState({
        todoListItems: [
          ...todoListItems.slice(0, idx),
          { ...item },
          ...todoListItems.slice(idx + 1),
        ],
        numberItemsLeft: nil,
      });
      this.filterList(filter);
    };
  }

  deleteSeft(idx: number) {
    return () => {
      const { todoListItems } = Object.assign(this.state);
      todoListItems.splice(idx, 1);
      this.setState({
        todoListItems: [...todoListItems],
      });
    };
  }

  addNewItem(item: Item) {
    const { todoListItems, numberItemsLeft } = this.state;
    const newTodoList = [{ ...item }, ...todoListItems];
    this.setState(
      {
        todoListItems: newTodoList,
        numberItemsLeft: numberItemsLeft + 1
      },
      () => {
        this.filterList(this.state.filter);
      }
    );
  }

  isCompleteAll() {
    let { todoListItems } = this.state;

    const toggleCompleteValue = new ToggleAllComplete(todoListItems)
      .mapListTrueFalse((item) => item.isComplete)
      .toggle();

    todoListItems = todoListItems.map((item: Item) => {
      return { title: item.title, isComplete: toggleCompleteValue };
    });

    this.setState({
      todoListItems: [...todoListItems],
    });
  }

  filterList(filter: Filter) {
    if (filter === Filter.Active) {
      const filterList_ = this.state.todoListItems.filter(
        (item) => !item.isComplete
      );
      this.setState({
        filterListItems: filterList_,
        filter: Filter.Active,
      });
    } else if (filter === Filter.Completed) {
      const filterList_ = this.state.todoListItems.filter(
        (item) => item.isComplete
      );
      this.setState({
        filterListItems: filterList_,
        filter: Filter.Completed,
      });
    } else {
      this.setState({
        filterListItems: this.state.todoListItems,
        filter: Filter.All,
      });
    }
  }

  clearCompleted() {
    const { todoListItems, filter } = this.state;
    const activeList = todoListItems.filter((item) => !item.isComplete);
    this.setState(
      {
        todoListItems: activeList,
      },
      () => {
        this.filterList(filter);
      }
    );
  }

  render() {
    const { filterListItems, filter, numberItemsLeft } = this.state;
    return (
      <>
        <h1 className="header">todos</h1>
        <div className="App">
          <TodoInput
            addTodoItem={this.addNewItem}
            completeAll={this.isCompleteAll}
          />
          {filterListItems &&
            filterListItems.map((item, idx) => (
              <TodoItems
                key={idx}
                item={item}
                toggleState={this.toggleCompleteByIndex(idx)}
                deleteSeft={this.deleteSeft(idx)}
              />
            ))}
          {this.state.todoListItems.length !== 0 && (
            <TodoFooter
              filter={filter}
              numberItemsLeft={numberItemsLeft}
              filterList={this.filterList}
              clearCompleted={this.clearCompleted}
            />
          )}
        </div>
      </>
    );
  }
}
