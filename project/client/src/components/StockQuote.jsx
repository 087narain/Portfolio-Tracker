import React, { useState, useEffect } from 'react';
import StockBar from './StockBar';

function StockQuote({symbol, token}) {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol || !token) {
            return;
        }

        console.log("useEffect triggered");  

        fetch (`http://localhost:8080/api/alphavantage/etf/${symbol}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })  

        .then(response => {
            if (!response.ok) {
                throw new Error('Failure in fetching Stock data.');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Stock data:", data);
            setQuote(data)
        })
        .catch(err => setError(err.message));
    }, [symbol, token]);

    if (error) return <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded shadow-md">Error: {error}</p>;
    if (!quote) return <p className="text-gray-700 dark:text-gray-300 p-3 rounded">Loading...</p>;

    const open = parseFloat(quote["02. open"]);
    const high = parseFloat(quote["03. high"]);
    const low = parseFloat(quote["04. low"]);
    const price = parseFloat(quote["05. price"]);

    const changePercentString = quote["10. change percent"] || "0%";
    const changePercent = parseFloat(changePercentString);

    const isPositive = changePercent > 0;
    const isNegative = changePercent < 0;

    return (
        <div className="w-full bg-white dark:bg-darkBlue2 rounded-lg shadow-md p-6 border border-gray-300 dark:border-darkBlue3 text-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-4 text-accentBlue">Stock Quote</h2>
      
          <div className="flex flex-row gap-8">
            {/* Left: Raw Data */}
            <div className="flex-1">
              <p><strong>Open:</strong> {quote["02. open"]}</p>
              <p><strong>High:</strong> {quote["03. high"]}</p>
              <p><strong>Low:</strong> {quote["04. low"]}</p>
              <p><strong>Price:</strong> {quote["05. price"]}</p>
              <p><strong>Volume:</strong> {quote["06. volume"]}</p>
              <p><strong>Latest Trading Day:</strong> {quote["07. latest trading day"]}</p>
              <p><strong>Previous Close:</strong> {quote["08. previous close"]}</p>
              <p><strong>Change:</strong> {quote["09. change"]}</p>
              <p><strong>Change Percent:</strong> {quote["10. change percent"]}</p>
            </div>
      
            {/* Right: Stock Bar */}
            <div className="w-48 flex-shrink-0 flex items-center">
              <StockBar low={low} high={high} open={open} price={price} />
            </div>

            {/* Change Percent Badge */}
            <div
            className={`
                w-20 h-20 rounded-full flex items-center justify-center font-semibold text-3xl
                ${
                isPositive
                    ? "bg-green-500 text-white"
                    : isNegative
                    ? "bg-red-500 text-white"
                    : "bg-gray-400 text-gray-900"
                }
            `}
            title={`Change Percent: ${changePercentString}`}
            >
            {isPositive ? "▲" : isNegative ? "▼" : ""}
            {changePercentString}
            </div>
            
          </div>
        </div>
    );
}

export default StockQuote;