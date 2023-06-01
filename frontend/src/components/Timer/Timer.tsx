import { useEffect, useState } from 'react';

const Timer = () => {
  const timerLength = 5;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        console.log('seconds', seconds, 'len', timerLength);
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      interval && clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return (
    <div>
      <div>{timerLength - seconds}</div>
      {isActive ? (
        <button onClick={() => setIsActive(false)}>pause</button>
      ) : (
        <button onClick={() => setIsActive(true)}>start</button>
      )}
    </div>
  );
};

export default Timer;
