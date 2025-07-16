import React, { useEffect } from 'react';
import { getTotalValue } from './api/portfolio';

function App() {
  useEffect(() => {
    const testPortfolio = {
      portfolioName: "Test Portfolio",
      creationDate: "2025-07-15T12:00:00",
      totalValue: 2600.0,
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

    getTotalValue(testPortfolio)
      .then((value) => console.log("Total Value:", value))
      .catch((error) => console.error("API Error:", error));
  }, []);

  return (
    <div>
      <h1>Portfolio Tracker</h1>
      <p>Check the console for API response.</p>
    </div>
  );
}

export default App;