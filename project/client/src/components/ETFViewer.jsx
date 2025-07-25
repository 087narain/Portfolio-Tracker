import React, { useState } from 'react';
import ETFQuote from './ETFQuote';

function ETFViewer({ token }) {
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
            {submittedSymbol && <ETFQuote symbol={submittedSymbol} token={token} />}
        </div>
    );
}

export default ETFViewer;




