import React, { useState } from 'react';

export default function PortfolioForm({ onSubmit }) {
    const [portfolioName, setPortfolioName] = useState('');
    const [balance, setBalance] = useState(0.0);
    const [currency, setCurrency] = useState('USD');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!portfolioName.trim() || !currency || !balance) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (isNaN(balance) || balance < 0) {
            setErrorMessage('Balance must be a valid non-negative number.');
            return;
        }

        setErrorMessage('');
        
        const portfolioData = {
            portfolioName,
            balance: parseFloat(balance),
            currency
        };

        onSubmit(portfolioData);
        
        setPortfolioName('');
        setBalance('');
        setCurrency('');
    };

    return(
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Create New Portfolio</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="portfolioName">Portfolio Name</label>
                <input
                    type="text"
                    id="portfolioName"
                    value={portfolioName}
                    onChange={(e) => setPortfolioName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="balance">Initial Balance</label>
                <input
                    type="number"
                    id="balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="currency">Currency</label>
                <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="INR">INR</option>
                    <option value="SGD">SGD</option>
                </select>
            </div>

            {errorMessage && (
                <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4 transition-colors"
            >
                Create Portfolio
            </button>
        </form>
    );
}   