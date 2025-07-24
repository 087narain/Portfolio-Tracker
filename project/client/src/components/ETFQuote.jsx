import React, { useState, useEffect } from 'react';

function ETFQuote({symbol, token}) {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol || !token) {
            return;
        }

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
        .then(data => setQuote(data))
        .catch(err => setError(err.message));
    }, [symbol, token]);

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;

    return(
        <div className='etf-card'>
            <h2>{quote.symbol}</h2>
            <p><strong>Open:</strong> {quote.open}</p>
            <p><strong>High:</strong>:{quote.high}</p>
            <p><strong>Low:</strong>{quote.low}</p>
            <p><strong>Price:</strong> {quote.price}</p>
            <p><strong>Volume:</strong> {quote.volume}</p>
            <p><strong>Latest Trading Day:</strong> {quote.latestTradingDay}</p>
            <p><strong>Previous Close:</strong> {quote.previousClose}</p>
            <p><strong>Change:</strong> {quote.changePercent}</p>
        </div>
    );
}

export default ETFQuote;