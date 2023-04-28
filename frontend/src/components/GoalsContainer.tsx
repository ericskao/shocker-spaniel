import useGoals from '../hooks/useGoals';
import Clock from './Clock';
import Goal from './Goal';
import GoalsList from './GoalsList';
import TextInput from './TextInput';

import './GoalsContainer.scss';

export interface GoalInterface {
  id: number;
  isPrimary: boolean;
  title: string;
  completed: null | boolean;
}

const GoalsContainer = () => {
  const { goals, addGoalMutation } = useGoals();
  const primaryGoal = goals && goals.find((goal: GoalInterface) => goal.isPrimary);

  return (
    <div className="goals-container bg-coolGray-400 relative">
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

export default GoalsContainer;
