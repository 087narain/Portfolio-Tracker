import axios from 'axios';

export const getTotalValue = async (portfolioId) => {
    const response = await axios.post('/api/portfolio/total', portfolio);
    return response.data;
}; 