import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioSummary from './components/PortfolioSummary';
import AssetList from './components/AssetList';
import { getTotalValue } from './api/portfolio';


function App() {
  const [totalValue, setTotalValue] = useState(null);
  const [error, setError] = useState(false);

  const portfolio = {
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
        purchaseTime: "2025-07- 14T10:00:00",
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
  };

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const result = await getTotalValue(portfolio);
        console.log("Axios response:", result);
        setTotalValue(result.data.totalValue);
      } catch (err) {
        console.error("API error:", err);
        setError(true);
      }
    };

    fetchValue();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-between p-6'>
      <Header />
      <main className='p-6 w-full max-w-2xl bg-white shadow-md rounded-lg p-6'>
        {error ? (
          <div className="text-red-500 text-center bg-red-100 p-4 rounded">Failed to reach portfolio value.</div>  
        ) : totalValue === null ? (
          <div className='text-center text-lg'>Loading...</div>
        ) : (
          <>
            <PortfolioSummary portfolioName={portfolio.portfolioName} totalValue={totalValue} />
            <AssetList assets={portfolio.assets} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;