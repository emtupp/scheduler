import React from "react";

import "components/DayListItem.scss";

import classnames from "classnames";

export default function DayListItem(props) {

  const { selected, spots } = props;
  const dayClass = classnames("day-list__item",
  { "day-list__item--selected": selected },
  { "day-list__item--full": spots === 0 }
  );

  if (spots > 1) {
    return (
      <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
    );
  } else if (spots === 1) {
    return (
      <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{props.spots} spot remaining</h3>
      </li>
    );
  };
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">no spots remaining</h3>
    </li>
  );
};