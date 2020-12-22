// See tests for details on helper functions

export function getAppointmentsForDay(state, day) {
  let idArray = [];
  const results = [];
  for (let targetDay of state.days) {
    if (targetDay.name === day) {
      idArray = targetDay.appointments;
    }
  }
  if (idArray.length === 0) {
    return [];
  }
  for (let id of idArray) {
    for (let key in state.appointments) {
      if (id === Number(key)) {
        results.push(state.appointments[key]);
      }
    }
  }
  return results;
};

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let result = interview;
  const interviewerID = Object.keys(state.interviewers).map( id => Number(id) );
  
  for (let id of interviewerID) {
    if (id === interview.interviewer) {
      result.student = interview.student;
      result.interviewer = state.interviewers[id];
    }
  }
  return result;
};

export function getInterviewersForDay(state, day) {
  let idArray = [];
  const results = [];
  for (let targetDay of state.days) {
    if (targetDay.name === day) {
      idArray = targetDay.interviewers;
    }
  }
  if (idArray.length === 0) {
    return [];
  }
  for (let id of idArray) {
    for (let key in state.interviewers) {
      if (id === Number(key)) {
        results.push(state.interviewers[key]);
      }
    }
  }
  return results;
};