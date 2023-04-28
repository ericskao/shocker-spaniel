import TextInput from './TextInput';

import useGoals from '../hooks/useGoals';
import { GoalInterface } from './GoalsContainer';

import Goal from './Goal';
import './GoalsList.scss';

const GoalsList = () => {
  const { goals, addGoalMutation } = useGoals();
  return (
    <section className="goals-list">
      Goals list here
      <ul>
        {goals.map((goal: GoalInterface) => (
          <li key={goal.id}>
            <Goal goal={goal} />
          </li>
        ))}
      </ul>
      <div className="goals-list__add">
        <TextInput
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
