import axios from 'axios';

export const getTotalValue = (portfolio) => {
  return axios.post('http://localhost:8080/api/portfolio/total', portfolio);
};