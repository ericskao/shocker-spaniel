import apiClient from '../http-common';

export const getGoals = () => {
  return apiClient
    .get('/goals')
    .then((response) => response.data)
    .catch((err) => err);
};
