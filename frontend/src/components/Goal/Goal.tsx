import classnames from 'classnames';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import apiClient from '../../http-common.js';
import Checkbox from '../Checkbox';
import { GoalInterface } from '../MainPage/MainPage.js';
import OutsideClickDetector from '../OutsideClickDetector';
import TextInput from '../TextInput';

const Goal = ({
  goal,
  showCheckmark = false,
  variant,
}: {
  goal: GoalInterface;
  showCheckmark?: boolean;
  variant: string;
}) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

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

  const deleteGoal = useMutation({
    mutationFn: () =>
      apiClient
        .delete(`/goals/${goal.id}`)
        .catch((err) => console.log('something went wrong deleting', goal.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  return (
    <div className="relative group flex gap-2 items-center">
      <Checkbox
        className={classnames({
          visible: goal.completed || showCheckmark,
          'invisible group-hover:visible': !goal.completed && !showCheckmark,
        })}
        onInputChange={() => completeGoal.mutate()}
        checked={!!goal.completed}
      />
      {editing ? (
        <TextInput
          autoFocus
          onEnter={(title: string) => {
            if (title !== '') {
              editGoal.mutate(title);
            } else {
              setEditing(false);
            }
          }}
          onEscape={() => setEditing(false)}
          value={goal.title}
          variant="primary"
        />
      ) : (
        <div className={classnames({ 'line-through': goal.completed })}>{goal.title}</div>
      )}
      <button
        className={classnames('invisible group-hover:visible', {
          'group-hover:invisible': showOptions,
        })}
        onClick={() => setShowOptions(true)}
      >
        ...
      </button>
      {showOptions && (
        <OutsideClickDetector
          className={classnames('absolute flex gap-3 ml-2', {
            'left-full': variant === 'primary',
            'left-3/4': variant === 'secondary',
          })}
          onClickOutside={() => {
            if (showOptions) setShowOptions(false);
          }}
        >
          <button onClick={() => setEditing(!editing)}>Edit</button>
          <button onClick={() => deleteGoal.mutate()}>Delete</button>
        </OutsideClickDetector>
      )}
    </div>
  );
};

export default Goal;
