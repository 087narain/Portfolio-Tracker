import React, { useEffect, useState } from 'react';
import PortfolioForm from './PortfolioForm'
import {
  getUserPortfolios,
  createPortfolio,
  getAllAssets,
  addAssetToPortfolio,
  removeAssetFromPortfolio,
  getTotalValue
} from '../api/portfolio';

const Dashboard = () => {
    console.log("Dashboard component rendered");
    const [portfolios, setPortfolios] = useState([]);
    const [pickedPortfolioId, setPickedPortfolioId] = useState(null);
    const [assets, setAssets] = useState([]);
    const [totalValue, setTotalValue] = useState(null);

    useEffect(() => {
        console.log("Dashboard loaded");
        loadPortfolios();
    }, []);
    
    const loadPortfolios = () => {
        getUserPortfolios()
          .then(res => setPortfolios(res.data))
          .catch(err => console.error('Failed to fetch portfolios', err));
    };

    const handlePortfolioSelection = (portfolio) => {
        setPickedPortfolioId(portfolio.id); 
      
        getAllAssets(portfolio.id)
          .then(res => {
            console.log('Assets response:', res.data);
            setAssets(res.data);
          })
          .catch(err => console.error('Failed to fetch assets', err));
      
        getTotalValue(portfolio.id)
          .then(res => {
            console.log('Total value response:', res.data);
            setTotalValue(res.data.totalValue ?? res.data);
          })
          .catch(err => console.error('Failed to fetch total value', err));
    };

    const handleCreatePortfolio = (portfolioData) => {
        createPortfolio(portfolioData)
          .then(res => {
            const newPortfolio = res.data;
            console.log("📦 New portfolio created:", newPortfolio);
      
            setPortfolios(prev => [...prev, newPortfolio]);
            setPickedPortfolioId(newPortfolio.id); 
            console.log("🆕 New ID set:", newPortfolio.id);
      
            getAllAssets(newPortfolio.id)
              .then(res => setAssets(res.data))
              .catch(err => console.error('Failed to fetch assets', err));
      
            getTotalValue(newPortfolio.id)
              .then(res => setTotalValue(res.data.totalValue ?? res.data))
              .catch(err => console.error('Failed to fetch total value', err));
          })
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
        <div className="text-gray-900 dark:text-white">
          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-normal font-inter text-center text-cyan-600 dark:text-cyan-400 mb-6">
            Portfolio Dashboard
          </h1>
        
          {/* Asset List */}
          {pickedPortfolioId && (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Assets</h2>
              <button
                onClick={handleAddAsset}
                className="px-4 py-2 mb-4 rounded bg-accentBlue text-white hover:bg-accentGreen transition-colors"
              >
                Add Asset
              </button>
              <ul className="space-y-2">
                {assets.map((asset) => (
                  <li
                    key={`${asset.ticker}-${asset.purchaseTime}`}
                    className="flex items-center justify-between p-3 rounded bg-gray-100 dark:bg-darkBlue2"
                  >
                    <span>
                      {asset.ticker} - {asset.quantity} priced at: ${asset.purchasePrice}
                    </span>
                    <button
                      onClick={() => handleRemoveAsset(asset.ticker)}
                      className="text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
      
              {/* Total Value */}
              <h3 className="text-xl font-bold mt-6">
                Total Value:{' '}
                {totalValue !== null ? `$${totalValue}` : 'Loading...'}
              </h3>
            </>
          )}
        </div>
    );
};

export default Dashboard;