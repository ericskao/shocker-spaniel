import Input from './Input';

import { useRef } from 'react';
import useGoals from '../hooks/useGoals';
import { GoalInterface } from './GoalsContainer';

import './GoalsList.scss';

const GoalsList = () => {
  const { goals, addGoalMutation } = useGoals();
  const inputRef = useRef(null);
  return (
    <section className="goals-list">
      Goals list here
      <ul>
        {goals.map((goal: GoalInterface) => (
          <li key={goal.id}>{goal.title}</li>
        ))}
      </ul>
      <div className="goals-list__add">
        <Input
          ref={inputRef}
          onEnter={(title: string) => {
            addGoalMutation.mutate({ title, isPrimary: false });
          }}
          placeholder="Add a goal here"
          variant="secondary"
        />
      </div>
    </section>
  );
};

export default GoalsList;
