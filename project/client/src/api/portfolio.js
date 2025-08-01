import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/portfolio';

const authHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
}

export const getTotalValue = (portfolioId) => {
  return axios.post(`${API_BASE_URL}/total`, { portfolioDTOId: portfolioId }, authHeader());
};

export const getUserPortfolios = () => {
  return axios.get(`${API_BASE_URL}/my-portfolios`, authHeader());
};

export const createPortfolio = (portfolioData) => {
  return axios.post(`${API_BASE_URL}/create`, portfolioData, authHeader());
};

export const addAssetToPortfolio = (portfolioId, assetData) => {
  return axios.post(`${API_BASE_URL}/add-asset/${portfolioId}`, assetData, authHeader());
};

export const getAllAssets = (portfolioId) => {
  return axios.post(`${API_BASE_URL}/all-assets`, { portfolioDTOId: portfolioId }, authHeader());
}

export const removeAssetFromPortfolio = (portfolioId, ticker) => {
  return axios.delete(`${API_BASE_URL}/remove-asset/${portfolioId}/${ticker}`, authHeader());
};