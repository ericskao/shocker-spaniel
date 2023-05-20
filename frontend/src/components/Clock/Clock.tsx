import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState<DateTime>(DateTime.now());

  useEffect(() => {
    setInterval(() => {
      setTime(DateTime.now());
    }, 1000);
  }, []);

  return <h1 className="text-8xl mb-5">{time.toLocaleString(DateTime.TIME_SIMPLE)}</h1>;
};

export default Clock;
