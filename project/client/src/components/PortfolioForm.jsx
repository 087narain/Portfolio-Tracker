import React, { useState } from 'react';

export default function PortfolioForm({ onSubmit }) {
    const [portfolioName, setPortfolioName] = useState('');
    const [balance, setBalance] = useState(0.0);
    const [currency, setCurrency] = useState('USD');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
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
        setSuccessMessage('');
      
        const portfolioData = {
          portfolioName,
          balance: parseFloat(balance),
          currency,
        };
      
        try {
          const response = await fetch('http://localhost:8080/api/portfolio/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(portfolioData)
          });
      
          if (!response.ok) {
            throw new Error('Failed to create portfolio. Please try again.');
          }
      
          const data = await response.json();
          console.log('Portfolio created successfully:', data);
          onSubmit(data); // Call onSubmit with the returned portfolio
      
          setSuccessMessage('Portfolio created successfully!');
          setPortfolioName('');
          setBalance(0.0);
          setCurrency('USD');
        } catch (err) {
          console.error('Error creating portfolio:', err);
          setErrorMessage(err.message || 'An error occurred while creating the portfolio.');
        }
    };

    return (
        <>
            {successMessage && (
                <div className="mb-4 bg-green-600 text-white p-3 rounded shadow">
                {successMessage}
                </div>
            )}
            <form 
            onSubmit={handleSubmit} 
            className="bg-gray-100 dark:bg-darkBlue3 shadow-md rounded-lg p-6 w-auto   text-gray-900 dark:text-white"
            >
            <h2 className="text-2xl font-bold mb-4 text-center text-accentBlue dark:text-accentBlue">
                Create New Portfolio 📒
            </h2>
        
            {/* Portfolio Name */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="portfolioName">
                Portfolio Name
                </label>
                <input
                type="text"
                id="portfolioName"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
                required
                />
            </div>
        
            {/* Initial Balance */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="balance">
                Initial Balance
                </label>
                <input
                type="number"
                id="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
                required
                />
            </div>
        
            {/* Currency */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="currency">
                Currency
                </label>
                <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
                >
                    {/* options */}
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="INR">INR</option>
                    <option value="SGD">SGD</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    
                </select>
            </div>
        
            {/* Error Message */}
            {errorMessage && (
                <div className="text-red-600 dark:text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
        
            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-accentBlue hover:bg-accentGreen text-white p-2 rounded mt-4 transition-colors"
            >
                Create Portfolio
            </button>
            </form>
        </>
    );
}   