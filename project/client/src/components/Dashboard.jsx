import React, { useEffect, useState } from 'react';
import {
  getUserPortfolios,
  createPortfolio,
  getAllAssets,
  addAssetToPortfolio,
  removeAssetFromPortfolio,
  getTotalValue
} from '../api/portfolio';

const Dashboard = () => {
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
            .then(res => setTotalValue(res.data.totalValue ?? res.data))
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
        addAssetToPortfolio(pickedPortfolioId, asset)
          .then(() => handlePortfolioSelection(pickedPortfolioId))
          .catch(err => console.error('Failed to add asset', err));
    };

    const handleRemoveAsset = (ticker) => {
        removeAssetFromPortfolio(pickedPortfolioId, ticker)
          .then(() => handlePortfolioSelection(pickedPortfolioId))
          .catch(err => console.error('Failed to remove asset', err));
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <button onClick={handleCreatePortfolio}>Create Portfolio</button>

            <h2>Your Portfolios</h2>
            <ul>
                {portfolios.map(p => (
                    <li key={p.id}>
                        <button onClick={() => handlePortfolioSelection(p.id)}>
                        {p.portfolioName}
                        </button>
                    </li>
                ))}
            </ul>

            {pickedPortfolioId && (
                <>
                    <h2>Assets</h2>
                    <button onClick={handleAddAsset}>Add Asset</button>
                    <ul>
                        {assets.map(asset => (
                            <li key={`${asset.ticker}-${asset.purchaseTime}`}>
                                {asset.ticker} - {asset.quantity} priced at: ${asset.purchasePrice}
                                <button onClick={() => handleRemoveAsset(asset.ticker)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <h3>Total Value: ${totalValue !== null ? totalValue : 'Loading...'}</h3>
                </>
            )}
        </div>
    );
};

export default Dashboard;