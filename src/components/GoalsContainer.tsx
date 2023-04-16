import { DateTime } from 'luxon';

import './GoalsContainer.scss';
import Input from './Input';
import { useEffect, useState } from 'react';

const GoalsContainer = () => {
  const [time, setTime] = useState<DateTime>(DateTime.now());

  useEffect(() => {
    setInterval(() => {
      setTime(DateTime.now());
    }, 10000);
  }, []);
  const onGoalInputEnter = (val: string) => {
    console.log('hi', val);
  };

  return (
    <div className="goals-container bg-coolGray-400">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="text-8xl mb-5">{time.toLocaleString(DateTime.TIME_SIMPLE)}</div>
          <div>Good evening, Commander</div>
        </div>
        <div className="text-center">
          <div>What is your main focus for today?</div>
          <Input onEnter={onGoalInputEnter}></Input>
        </div>
      </div>
    </div>
  );
};

export default GoalsContainer;
