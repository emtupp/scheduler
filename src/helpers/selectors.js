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
}