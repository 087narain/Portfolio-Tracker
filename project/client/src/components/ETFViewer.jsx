import React, { useState } from 'react';
import ETFQuote from './ETFQuote';

function ETFViewer({ token }) {
    const [symbol, setSymbol] = useState('');
    const [showQuote, setShowQuote] = useState(false);

    const handleInputChange = (event) => {
        setSymbol(event.target.value);
        setShowQuote(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowQuote(true);
    };

    return (
        <div className="etf-viewer">
            <h1>ETF Viewer</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={symbol}
                    onChange={handleInputChange}
                    placeholder="Enter ETF Symbol"
                />
                <button type="submit">Get Quote</button>
            </form>
            {showQuote && symbol && <ETFQuote symbol={symbol} token={token} />}
        </div>
    );
}

export default ETFViewer;




