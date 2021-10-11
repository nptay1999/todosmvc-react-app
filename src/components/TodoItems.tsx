import { Component } from "react";
import classNames from "classnames";
import { Item } from "../models";
import "./TodoItems.css";

interface Props {
  item: Item;
  toggleState: () => any;
}

export default class TodoItems extends Component<Props> {
  render() {
    const { title, isComplete }: Item = this.props.item;
    const { toggleState } = this.props;
    return (
      <div className={classNames("todo-item", { active: isComplete })} onClick={ toggleState }>
        {title}
      </div>
    );
  }
}
