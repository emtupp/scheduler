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
      if (id == key) {
        results.push(state.appointments[key]);
      }
    }
  }
  return results;
};

export function getInterview(state, interview) {
  let result;
  if (interview === null) {
    return interview;
  }
  result = interview;
  const interviewerID = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerID];
  result.interviewer = interviewerObj;
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
      if (id == key) {
        results.push(state.interviewers[key]);
      }
    }
  }
  return results;
};