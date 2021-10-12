import { Component } from "react";
import classNames from "classnames";
import { Item } from "../models";
import "./TodoItems.css";
import circle from '../assets/circle.svg';
import checked from '../assets/checked.svg';
import close from '../assets/close.svg';

interface Props {
  item: Item;
  toggleState: () => any;
  deleteSeft: () => void;
}

export default class TodoItems extends Component<Props> {
  render() {
    // declare input variable
    const { title, isComplete }: Item = this.props.item;
    // declare input function
    const { toggleState, deleteSeft } = this.props;

    const imgUrl = isComplete ? checked : circle;
    
    return (
      <div className={classNames("todo-item", { active: isComplete })} >
        <img onClick={ toggleState } src={imgUrl} width={32} height={32} alt="icon" className="check" />
        <span>{title}</span>
        <img onClick={ deleteSeft } src={close} alt="icon" width={24} height={24} className="close" />
      </div>
    );
  }
}
