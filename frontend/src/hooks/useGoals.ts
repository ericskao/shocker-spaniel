import { useMutation, useQuery, useQueryClient } from 'react-query';
import apiClient from '../http-common';
import { getGoals } from '../queries/goals';

const useGoals = () => {
  const queryClient = useQueryClient();

  const goals = useQuery('goals', getGoals)?.data || [];

  const addGoalMutation = useMutation({
    mutationFn: (payload: { title: string; isPrimary: boolean }) =>
      apiClient
        .post(`/goals`, { title: payload.title, isPrimary: payload.isPrimary })
        .then((res) => res)
        .catch((err) => console.log(err)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  return { goals, addGoalMutation };
};

export default useGoals;
