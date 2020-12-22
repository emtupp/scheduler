import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
  }, []);
      
  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview, isNew) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (day.appointments.includes(id) && isNew ) {
        day.spots -= 1;
        return day;
      }
      return day;
    });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({ ...prev, appointments, days }))
    })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (day.appointments.includes(id) ) {
        day.spots += 1;
        return day;
      }
      return day;
    });

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
    setState(prev => ({ ...prev, appointments, days }))
  })
  }

  return { state, setState, setDay, bookInterview, cancelInterview }
};