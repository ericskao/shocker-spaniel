import { GoalInterface } from './GoalsContainer';
import axios from 'axios';

import './Goal.scss';
import Input from './Input';
import { useState } from 'react';

const Goal = ({ goal }: { goal: GoalInterface }) => {
  const [editing, setEditing] = useState<boolean>(false);

  const onInputCheck = () => {
    axios
      .put(`/goals/${goal.id}`, {
        completed: !goal.completed,
      })
      .catch((err) => console.log(err));
  };

  const onInputSubmit = (title: string) => {
    axios
      .put(`/goals/${goal.id}`, {
        title,
      })
      .then((res) => {
        if (res.status === 200) {
          setEditing(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <li className="goal flex gap-2 items-center p-2">
      <input type="checkbox" onChange={onInputCheck} checked={!!goal.completed} />
      {editing ? (
        <Input autoFocus onEnter={onInputSubmit} value={goal.title} />
      ) : (
        <div>{goal.title}</div>
      )}
      <button onClick={() => setEditing(true)}>Edit</button>
    </li>
  );
};

export default Goal;
