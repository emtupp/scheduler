import React, { useState } from "react";

export default function useVisualMode(initial) {
  
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (changeMode, replace = false) => {
    if (!replace) {
      setHistory(prev => [...prev, changeMode]);
    } else {
      setHistory(prev => [...prev.pop(), changeMode]);
    }
    setMode(changeMode);
  }

  const back = () => {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length -1])
    } else {
      setMode(initial);
      setHistory(initial);
    }
  };

  return { mode, transition, back };
}