import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode.js"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview( props.id, { ...interview } )
    .then(() => transition(SHOW));
  }

  function deleteInterview() {
    const interview = {
      student: "",
      intrerviewer: null
    }
    transition(DELETING);
    props.cancelInterview( props.id )
    .then(() => transition(EMPTY));
  }

  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
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
      onCancel={back}
    />
    )}
  </article>;
}