import React, { useState } from "react";

export default function useVisualMode(initial) {
  
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (changeMode, replace = false) => {
    if (!replace) {
      setHistory(prev => [...prev, changeMode]);
    } else {
      setHistory(prev => {
        prev.pop();
        return [...prev, changeMode]
      });
    }
    setMode(changeMode);
  }
  
  const back = () => {
    setHistory(prev => {
      if (history.length > 1) {
        prev.pop();
        setMode(prev[prev.length -1])
      } else {
        setMode(initial);
        // setHistory(initial);
      }
      return prev;
    })
  };

  return { mode, transition, back };
}