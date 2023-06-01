import { MutableRefObject, useEffect, useRef, useState } from 'react';

const Timer = () => {
  const timerLength = 5;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showBreak, setShowBreak] = useState(false);
  let timerRef = useRef(null) as MutableRefObject<null | number>;

  const clearTimer = () => {
    timerRef?.current && clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearTimer();
    }
    return () => {
      clearTimer();
    };
  }, [isActive]);

  useEffect(() => {
    if (seconds >= timerLength) {
      clearTimer();
      setIsActive(false);
      setShowBreak(true);
    }
  }, [seconds]);

  const timerComplete = seconds >= timerLength;

  return (
    <div className="mb-20">
      <div>tabs here</div>
      <div>progress bar will go here</div>
      <div>{timerLength - seconds}</div>
      {!timerComplete &&
        (isActive ? (
          <button onClick={() => setIsActive(false)}>pause</button>
        ) : (
          <button onClick={() => setIsActive(true)}>start</button>
        ))}
    </div>
  );
};

export default Timer;
