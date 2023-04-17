import { DateTime } from 'luxon';
import Input from './Input';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './GoalsContainer.scss';

interface GoalInterface {
  id: number;
  isPrimary: boolean;
  title: string;
}

const GoalsContainer = () => {
  const [time, setTime] = useState<DateTime>(DateTime.now());
  const [todaysGoal, setTodaysGoal] = useState<null | GoalInterface>(null);

  useEffect(() => {
    axios.get('/goals').then((response) => console.log(response.data));
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(DateTime.now());
    }, 1000);
  }, []);

  const onGoalInputEnter = (title: string) => {
    axios
      .post('/goals', { title, isPrimary: true })
      .then((response) => {
        setTodaysGoal(response.data);
      })
      .catch((error) => console.log(error));
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
