import { useMutation, useQuery, useQueryClient } from 'react-query';
import apiClient from '../http-common';
import { getGoals } from '../queries/goals';
import Clock from './Clock';
import Goal from './Goal';
import Input from './Input';

import './GoalsContainer.scss';

export interface GoalInterface {
  id: number;
  isPrimary: boolean;
  title: string;
  completed: null | boolean;
}

const GoalsContainer = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data: query, error } = useQuery('goals', getGoals);

  const mutation = useMutation((title: string) =>
    apiClient.post(`/goals`, { title, isPrimary: true }),
  );

  const goals = query?.data || [];
  const primaryGoal = goals.find((goal: GoalInterface) => goal.isPrimary);

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
              <Input onEnter={(title: string) => mutation.mutate(title)}></Input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsContainer;
