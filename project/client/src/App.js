import React, { useEffect, useState } from 'react';
import { getTotalValue } from './api/portfolio';

function App() {
  const [totalValue, setTotalValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValue = async () => {
      const portfolio = {
        portfolioName: "Test Portfolio",
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
      };

      try {
        const response = await getTotalValue(portfolio);
        setTotalValue(response.totalValue); 
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to fetch portfolio value.");
      }
    };

    fetchValue();
  }, []);

  return (
    <div>
      <h1>Portfolio Tracker</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {totalValue !== null ? (
        <p>Total Portfolio Value: ${totalValue.toFixed(2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;