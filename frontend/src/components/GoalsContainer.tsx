import apiClient from '../http-common.js';
import Input from './Input';
import { useEffect, useState } from 'react';
import Clock from './Clock';
import Goal from './Goal';

import './GoalsContainer.scss';

export interface GoalInterface {
  id: number;
  isPrimary: boolean;
  title: string;
  completed: null | boolean;
}

const GoalsContainer = () => {
  const [todaysGoals, setTodaysGoal] = useState<GoalInterface[]>([]);

  useEffect(() => {
    apiClient.get('/goals').then((response) => {
      setTodaysGoal(response.data);
    });
  }, []);

  const onGoalInputEnter = (title: string) => {
    apiClient
      .post('/goals', { title, isPrimary: true })
      .then((response) => {
        // todo should update this with list of goals after we allow preplanning goals from day prior
        setTodaysGoal([response.data]);
      })
      .catch((error) => console.log(error));
  };

  const primaryGoal = todaysGoals.find((goal) => goal.isPrimary);

  return (
    <div className="goals-container bg-coolGray-400">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-center">
          <Clock />
          <div>Good evening, Commander</div>
        </div>
        <div className="mt-5 text-center">
          {primaryGoal ? (
            <div>
              <div>Today</div>
              <ul>
                <Goal goal={primaryGoal} />
              </ul>
            </div>
          ) : (
            <div>
              <div>What is your main focus for today?</div>
              <Input onEnter={onGoalInputEnter}></Input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsContainer;
