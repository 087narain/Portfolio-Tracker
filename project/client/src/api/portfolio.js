import axios from 'axios';

export const getTotalValue = async (portfolio) => {
  const response = await axios.post('http://localhost:8080/api/portfolio/total', portfolio);
  return response.data.totalValue;
};