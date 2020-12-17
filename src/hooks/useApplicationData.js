import { useState, useEffect } from "react";
import axios from "axios";

// import { spotsLeft } from "../helpers/selectors";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
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

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // let days = state.days;

    // const day = (days).map(day => {
    //   if (day.appointments.includes(id)) {
    //     return {
    //       ...day,
    //       spots: spotsLeft( ...state.days, day.name )
    //     }
    //   }
    //   return day;
    // })

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({ ...prev, appointments/*, day*/ }))
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
    setState(prev => ({ ...prev, appointments }))
  })
  }

  return { state, setState, setDay, bookInterview, cancelInterview }
};