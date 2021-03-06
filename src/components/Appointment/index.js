import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode.js";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer, isNew ) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
    .bookInterview( props.id, { ...interview }, isNew )
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING, true);
    props
    .cancelInterview( props.id )
    .then(() => {
      return transition(EMPTY)})
    .catch(() => {
      return transition(ERROR_DELETE, true)});
  };

  return <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} data-testid="appointment" />}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
    />
    )}
    {mode === CREATE && (
    <Form
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      isNew={true}
    />
    )}
    {mode === SAVING && (
      <Status message="Saving"
    />
    )}
    {mode === CONFIRM && (
      <Confirm
      message="Delete the appointment?"
      onCancel={back}
      onConfirm={deleteInterview}
    />
    )}
    {mode === DELETING && (
      <Status message="Deleting"
    />
    )}
    {mode === EDIT && (
      <Form
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      isNew={false}
    />
    )}
    {mode === ERROR_SAVE && (
      <Error
      message="Could not create appointment"
      onClose={back}
    />
    )}
    {mode === ERROR_DELETE && (
      <Error
      message="Could not delete appointment"
      onClose={back}
    />
    )}
  </article>;
};