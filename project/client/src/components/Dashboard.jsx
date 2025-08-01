import React, { useEffect, useState } from 'react';
import {
  getUserPortfolios,
  createPortfolio,
  getAllAssets,
  addAssetToPortfolio,
  removeAssetFromPortfolio,
  getTotalValue
} from '../api/portfolio';

const Dashboard () => {
    const [portfolios, setPortfolios] = useState([]);
    const [pickedPortfolioId, setPickedPortfolioId] = useState(null);
    const [assets, setAssets] = useState([]);
    const [totalValue, setTotalValue] = useState(null);

    useEffect(() => {
        loadPortfolios();
    }, []);
    
    const loadPortfolios = () => {
        getUserPortfolios()
          .then(res => setPortfolios(res.data))
          .catch(err => console.error('Failed to fetch portfolios', err));
    };

    const handlePortfolioSelection = (portfolioId) => {
        setPickedPortfolioId(portfolioId);
        getAllAssets(portfolioId)
            .then(res => setAssets(res.data))
            .catch(err => console.error('Failed to fetch assets', err));
        getTotalValue(portfolioId)
            .then(res => setTotalValue(res.data.totalValue || res.data))
            .catch(err => console.error('Failed to fetch total value', err));
    };

    const handleCreatePortfolio = () => {
        const data = {
            portfolioName: 'New Portfolio',
            balance: 1000,
            currency: 'USD'
        };
        createPortfolio(data)
          .then(loadPortfolios)
          .catch(err => console.error('Failed to create portfolio', err));
    };

    const handleAddAsset = () => {
        const asset = {
          ticker: 'AAPL',
          quantity: 5,
          purchasePrice: 150,
          purchaseTime: new Date().toISOString(),
          type: 'Stock'
        };
        addAssetToPortfolio(selectedPortfolioId, asset)
          .then(() => handlePortfolioSelect(selectedPortfolioId))
          .catch(err => console.error('Failed to add asset', err));
      };

}