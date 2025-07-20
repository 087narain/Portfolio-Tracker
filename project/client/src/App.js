import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioSummary from './components/PortfolioSummary';
import AssetList from './components/AssetList';
import { getTotalValue } from './api/portfolio';
import PortfolioForm from './components/PortfolioForm';
import AssetForm from './components/AssetForm';

function App() {
  const [totalValue, setTotalValue] = useState(null);
  const [error, setError] = useState(false);

  const handleNewPortfolio = (newPortfolioData) => {
    setPortfolio({
      ...newPortfolioData,
      creationDate: new Date().toISOString(),
      totalValue: 0.0,
      assets: []
    });
  };

  const handleNewAsset = (newAssetData) => {
    setPortfolio(prevPortfolio => ({
      ...prevPortfolio,
      assets: [...prevPortfolio.assets, newAssetData],
    }));
  }

  const [portfolio, setPortfolio] = useState({
    portfolioName: "Dummy Portfolio",
    creationDate: "2025-07-15T12:00:00",
    totalValue: 0.0,
    balance: 1000.0,
    currency: "USD",
    assets: [
      {
        ticker: "AAPL",
        quantity: 10,
        purchasePrice: 150.0,
        purchaseTime: "2025-07-14T10:00:00",
        type: "Stock"
      },
      {
        ticker: "TSLA",
        quantity: 5,
        purchasePrice: 200.0,
        purchaseTime: "2025-07-14T10:00:00",
        type: "Stock"
      }
    ]
  });

  useEffect(() => {

    if (!portfolio || !portfolio.assets || portfolio.assets.length === 0) {
      return;
    }

    const fetchValue = async () => {
      try {
        console.log("Sending portfolio:", portfolio);
        const result = await getTotalValue(portfolio);
        console.log("Axios response:", result);
        setTotalValue(result.data.totalValue);
      } catch (err) {
        console.error("API error:", err);
        setError(true);
      }
    };

    fetchValue();
  }, [portfolio]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-between p-6'>
      <Header />
      <main className='mt-6 p-6 w-full max-w-2xl bg-white shadow-md rounded-lg'>
        {error ? (
          <div className="text-red-500 text-center bg-red-100 p-4 rounded">Failed to reach portfolio value.</div>  
        ) : totalValue === null ? (
          <div className='text-center text-lg'>Loading...</div>
        ) : (
          <>
            <div className='min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-8 mt-2'>
              <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <PortfolioSummary portfolioName={portfolio.portfolioName} totalValue={totalValue} />
              </div>

              <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <AssetList assets={portfolio.assets} />
              </div>

              <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <PortfolioForm onSubmit={handleNewPortfolio} />
              </div>

              <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <AssetForm onSubmit={handleNewAsset} />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;