import React, { useState } from 'react';

export default function AssetForm({ onSubmit }) {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [purchaseTime, setPurchaseTime] = useState('');
    const [type, setType] = useState('Stock');
    
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!ticker.trim() || !quantity || !purchasePrice || !purchaseTime) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (isNaN(quantity) || quantity <= 0) {
            setErrorMessage('Quantity must be a valid positive number.');
            return;
        }

        if (isNaN(purchasePrice) || purchasePrice <= 0) {
            setErrorMessage('Purchase Price must be a valid positive number.');
            return;
        }

        setErrorMessage('');

        const assetData = {
            ticker: ticker.trim().toUpperCase(),
            quantity: parseFloat(quantity),
            purchasePrice: parseFloat(purchasePrice),
            purchaseTime: `${purchaseTime}T00:00:00`,
            type
        };

        onSubmit(assetData);

        setTicker('');
        setQuantity('');
        setPurchasePrice('');
        setPurchaseTime('');
        setType('Stock');
    };

    return (
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-100 dark:bg-darkBlue3 shadow-md rounded-lg p-6 w-full max-w-xl text-gray-900 dark:text-white"
        >
          <h2 className="text-2xl font-bold mb-4 text-accentBlue">Add New Asset 📈</h2>
      
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="ticker">Ticker</label>
            <input
              type="text"
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
              required
            />
          </div>
      
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
              required
            />
          </div>
      
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="purchasePrice">Purchase Price</label>
            <input
              type="number"
              id="purchasePrice"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
              required
            />
          </div>
      
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="purchaseTime">Date of Purchase</label>
            <input
              type="date"
              value={purchaseTime}
              onChange={(e) => setPurchaseTime(e.target.value)}
              className="w-full border border-gray-300 dark:border-darkBlue2 p-2 rounded mt-1 bg-white dark:bg-darkBlue1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
            />
          </div>
      
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="type">Asset Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-darkBlue2 bg-white dark:bg-darkBlue1 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
            >
              <option value="Stock">Stock</option>
              <option value="Bond">Bond</option>
              <option value="ETF">ETF</option>
              <option value="Mutual Fund">Mutual Fund</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>
      
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      
          <button
            type="submit"
            className="w-full bg-accentBlue hover:bg-accentGreen text-white p-2 rounded transition-colors"
          >
            Add Asset
          </button>
        </form>
    );
}