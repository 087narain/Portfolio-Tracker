import React, { useState, useEffect } from 'react';

function ETFQuote({symbol, token}) {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);

    const open = parseFloat(quote["02. open"]);
    const high = parseFloat(quote["03. high"]);
    const low = parseFloat(quote["04. low"]);
    const price = parseFloat(quote["05. price"]);

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
        <div className="w-full max-w-xl bg-white dark:bg-darkBlue2 rounded-lg shadow-md p-6 border border-gray-300 dark:border-darkBlue3 text-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-4 text-accentBlue">ETF Quote</h2>
          
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
    );
}

export default ETFQuote;