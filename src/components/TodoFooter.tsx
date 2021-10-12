import React from "react";
import { Filter } from "../models";
import "./TodoFooter.css";
import classNames from "classnames";

interface Props {
  numberItemsLeft: number;
  filter: Filter;
  filterList: (filter: Filter) => void;
  clearCompleted: () => void
}

export default function TodoFooter(props: Props) {
  const { numberItemsLeft, filter, filterList, clearCompleted } = props;
  return (
    <>
      <div className="footer">
        <div className="footer-left">{numberItemsLeft} items left</div>
        <div className="footer-center">
          <button
            className={classNames({ active: filter === Filter.All })}
            onClick={() => filterList(Filter.All)}
          >
            All
          </button>
          <button
            className={classNames({ active: filter === Filter.Active })}
            onClick={() => filterList(Filter.Active)}
          >
            Active
          </button>
          <button
            className={classNames({ active: filter === Filter.Completed })}
            onClick={() => filterList(Filter.Completed)}
          >
            Completed
          </button>
        </div>
        <div className="footer-right" onClick={() => clearCompleted()}>Clear completed</div>
      </div>
      <footer>footer</footer>
    </>
  );
}
