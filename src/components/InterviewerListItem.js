import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames";

export default function DayListItem(props) {

  const { selected } = props;
  const interviewersClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  if (selected) {
    return (
      <li className={interviewersClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.id}
        />
      {props.selected && props.name}
      </li>
    );
  };
  return (
    <li className={interviewersClass} onClick={props.setInterviewer} data-testid="interviewer" alt={props.name} >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.id}
      />
    </li>
  );
};