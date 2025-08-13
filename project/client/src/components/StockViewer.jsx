import React, { useState } from 'react';
import StockQuote from './StockQuote';

function StockViewer({ token }) {
    const [symbol, setSymbol] = useState('');
    const [submittedSymbol, setSubmittedSymbol] = useState(null);

    const handleInputChange = (event) => {
        setSymbol(event.target.value.toUpperCase().trim());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (symbol) {
            setSubmittedSymbol(symbol);
        }
    };

    return (
        <div className="w-full bg-gray-100 dark:bg-darkBlue2 shadow-md rounded-lg p-6 text-white">
          <h1 className="text-3xl text-center font-poppins font-bold mb-4 text-accentGreen">Stock Viewer</h1>
          <form onSubmit={handleSubmit} className="flex space-x-3 mb-4">
            <input
              type="text"
              value={symbol}
              onChange={handleInputChange}
              placeholder="Enter stock symbol"
              className="flex-grow p-2 rounded border border-gray-400 dark:border-darkBlue3 bg-gray-100 dark:bg-darkBlue1 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accentGreen"
            />
            <button
              type="submit"
              className="px-4 py-2 font-poppins bg-accentBlue rounded hover:bg-accentGreen transition-colors"
            >
              Get Quote
            </button>
          </form>
          {submittedSymbol && <StockQuote symbol={submittedSymbol} token={token} />}
        </div>
    );
}

export default StockViewer;




