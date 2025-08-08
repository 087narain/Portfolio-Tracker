import React, { useState, useEffect } from 'react';

function ETFQuote({symbol, token}) {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);
    const low = Number(quote["04. low"]);
    const high = Number(quote["03. high"]);
    const open = Number(quote["02. open"]);
    const current = Number(quote["05. price"]);

    const range = high - low;
    const openPos = ((open - low) / range) * 100;
    const currentPos = ((current - low) / range) * 100;

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
                throw new Error('Failure in fetching ETF data.');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched ETF data:", data);
            setQuote(data)
        })
        .catch(err => setError(err.message));
    }, [symbol, token]);

    if (error) return <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded shadow-md">Error: {error}</p>;
    if (!quote) return <p className="text-gray-700 dark:text-gray-300 p-3 rounded">Loading...</p>;

    return (
        <div>
          <div className="w-full max-w-xl bg-white dark:bg-darkBlue2 rounded-lg shadow-md p-6 border border-gray-300 dark:border-darkBlue3 text-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4 text-accentBlue">ETF Quote</h2>
            
            <p><strong>Open:</strong> {open}</p>
            <p><strong>High:</strong> {high}</p>
            <p><strong>Low:</strong> {low}</p>
            <p><strong>Price:</strong> {current}</p>
            <p><strong>Volume:</strong> {quote["06. volume"]}</p>
            <p><strong>Latest Trading Day:</strong> {quote["07. latest trading day"]}</p>
            <p><strong>Previous Close:</strong> {quote["08. previous close"]}</p>
            <p><strong>Change:</strong> {quote["09. change"]}</p>
            <p><strong>Change Percent:</strong> {quote["10. change percent"]}</p>
          </div>
      
          <div className="mt-4 max-w-xl mx-auto">
            <div className="relative h-6 bg-gray-300 dark:bg-darkBlue3 rounded-full">
              {/* Open position marker */}
              <div 
                className="absolute top-0 bottom-0 bg-accentBlue rounded-full" 
                style={{ left: `${openPos}%`, width: '2px' }} 
                title={`Open: ${open}`} 
              />
              {/* Current price position marker */}
              <div 
                className="absolute top-0 bottom-0 bg-accentGreen rounded-full" 
                style={{ left: `${currentPos}%`, width: '2px' }} 
                title={`Current: ${current}`} 
              />
            </div>
            <div className="flex justify-between text-sm mt-1 text-gray-700 dark:text-gray-300">
              <span>{low}</span>
              <span>{high}</span>
            </div>
          </div>
        </div>
    );
}

export default ETFQuote;