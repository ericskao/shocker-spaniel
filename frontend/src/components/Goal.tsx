import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import apiClient from '../http-common.js';
import { GoalInterface } from './GoalsContainer';
import Input from './Input';

import './Goal.scss';

const Goal = ({ goal }: { goal: GoalInterface }) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<boolean>(false);

  const completeGoal = useMutation({
    mutationFn: () =>
      apiClient
        .put(`/goals/${goal.id}`, {
          completed: !goal.completed,
        })
        .catch((err) => console.log(err)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const editGoal = useMutation({
    mutationFn: (title: string) =>
      apiClient
        .put(`/goals/${goal.id}`, {
          title,
        })
        .then((res) => {
          if (res.status === 200) {
            setEditing(false);
          }
        })
        .catch((err) => console.log(err)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  return (
    <li className="goal flex gap-2 items-center p-2">
      <input type="checkbox" onChange={() => completeGoal.mutate()} checked={!!goal.completed} />
      {editing ? (
        <Input autoFocus onEnter={(title: string) => editGoal.mutate(title)} value={goal.title} />
      ) : (
        <div>{goal.title}</div>
      )}
      <button onClick={() => setEditing(true)}>Edit</button>
    </li>
  );
};

export default Goal;
