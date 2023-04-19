import apiClient from '../http-common';

export const getGoals = () => {
  console.log('getting goals');
  return apiClient
    .get('/goals')
    .then((response) => response)
    .catch((err) => err);
};
