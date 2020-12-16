import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem.js";

import "components/InterviewerList.scss";

const InterviewerList = (props) => {

  const interviewerList = props.interviewers.map((value) => { 
    return (
    <InterviewerListItem
    key={value.id}
    name={value.name}
    avatar={value.avatar}
    selected={value.id === props.value}
    setInterviewer={() => props.setInterviewer(value.id)} />
  )})

  return (<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerList}</ul>
  </section>);

}
  
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;