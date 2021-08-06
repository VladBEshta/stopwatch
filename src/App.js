import React, { useState, useEffect } from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';


function App() {

  const [time, setTime] = useState(0)
  const [status, setStatus] = useState(false)


  useEffect(() => {

    const unsubscribeInt = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribeInt))
      .subscribe(() => {
        if (status) {
          setTime((val) => val + 1);
        }
      });
    return () => {
      unsubscribeInt.next();
      unsubscribeInt.complete();
    };
  }, [status]);


  const start = () => {
    setStatus(true)
  }

  const reset = () => {
    setTime(0)
    setStatus(true)
  }
  const stop = () => {
    if (time !== 0) {
      setTime(0)
      setStatus(false);
    }
  }
  const wait = () => {
    setStatus(false)
  }

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8)

  return (
    <div className='wrapper'>
      <h1>Stopwatch</h1>
      <div className="scoreboard">
        <span>{formattedTime}</span>
      </div>
      <div className="control-panel">
        {status
          ? <Button onClick={stop} color="primary"> Stop</Button>
          : <Button onClick={start} color="primary"> Start</Button>}
        <Button onClick={wait} color="default">Wait</Button>
        <Button onClick={reset} color="secondary">Reset</Button>
      </div>
    </div >
  )
}

export default App;
