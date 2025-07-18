import React, { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-6">
      <header className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold">📊 Portfolio Tracker</h1>
      </header>

      <main className="p-6 w-full max-w-xl">
        {error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            Failed to fetch portfolio value.
          </div>
        ) : totalValue == null || portfolio == null ? (
          <div className='text-center text-lg'>Loading...</div>
        ) : (
          <div className='bg-green-100 text-green-700 p-7 rounded'>
            <h2 className='text-xl font-bold mb-2'>
              Total Value for: {portfolio.portfolioName}
            </h2>
            <p className='text-lg mb-4'>
              💰 <span className='font-bold'>${totalValue.toFixed(2)}</span>
            </p>

            <h3 className='text-lg font-semibold mt-4'>Assets:</h3>
            <ul className="divide-y divide-gray-200 mt-2">
              {portfolio.assets.map((asset, index) => (
                <li key={index} className="py-2 flex gap-2">
                  <span className='font-bold'>{asset.ticker}</span> 
                  <span className="text-gray-600">–</span>
                  <span>
                    <span className="font-bold">{asset.quantity}</span> shares at  
                    <span className="font-bold"> {asset.purchasePrice.toFixed(2)}</span> USD each
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} Narain's Portfolio Tracker
      </footer>
    </div>
  );
}

export default App;