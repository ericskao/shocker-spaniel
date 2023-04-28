import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import apiClient from '../http-common.js';
import Checkbox from './Checkbox';
import { GoalInterface } from './GoalsContainer';
import TextInput from './TextInput';

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
    <div className="goal flex gap-2 items-center">
      <Checkbox onInputChange={() => completeGoal.mutate()} checked={!!goal.completed} />
      {editing ? (
        <TextInput
          autoFocus
          onEnter={(title: string) => editGoal.mutate(title)}
          onEscape={() => setEditing(false)}
          value={goal.title}
          variant="primary"
        />
      ) : (
        <div>{goal.title}</div>
      )}
      <button onClick={() => setEditing(!editing)}>Edit</button>
    </div>
  );
};

export default Goal;
