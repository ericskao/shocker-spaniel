import { useState } from 'react';
import useGoals from '../../hooks/useGoals';
import Clock from '../Clock/Clock';
import Goal from '../Goal/Goal';
import GoalsList from '../GoalsList';
import TextInput from '../TextInput';

import Timer from '../Timer/Timer';
import './MainPage.scss';

export interface GoalInterface {
  id: number;
  isPrimary: boolean;
  title: string;
  completed: null | boolean;
}

const MainPage = () => {
  const [showClock, setShowClock] = useState<boolean>(true);
  const { goals, addGoalMutation } = useGoals();
  const primaryGoal = goals && goals.find((goal: GoalInterface) => goal.isPrimary);

  return (
    <div className="goals-container bg-coolGray-400 relative">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="group text-center">
          <button
            className="group-hover:visible invisible"
            onClick={() => setShowClock(!showClock)}
          >
            Switch to {showClock ? 'Timer' : 'Clock'}
          </button>
          {showClock ? <Clock /> : <Timer />}
          <div>Good evening, Commander</div>
        </div>
        <div className="mt-5 text-center">
          {primaryGoal ? (
            <div>
              <div>Today</div>
              <ul>
                <Goal variant="primary" goal={primaryGoal} />
              </ul>
            </div>
          ) : (
            <div>
              <h2>What is your main focus for today?</h2>
              <TextInput
                onEnter={(title: string) => addGoalMutation.mutate({ title, isPrimary: true })}
                variant="primary"
              />
            </div>
          )}
        </div>
        <GoalsList />
      </div>
    </div>
  );
};

export default MainPage;
