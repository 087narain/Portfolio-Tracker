import React, { use, useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioSummary from './components/PortfolioSummary';
import AssetList from './components/AssetList';
import { getTotalValue } from './api/portfolio';
import PortfolioForm from './components/PortfolioForm';
import AssetForm from './components/AssetForm';
import StockViewer from './components/StockViewer';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function App() {
  const [totalValue, setTotalValue] = useState(null);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userPortfolios, setUserPortfolios] = useState([]);
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const handleNewPortfolio = (newPortfolioData) => {
    setPortfolio({
      ...newPortfolioData,
      creationDate: new Date().toISOString(),
      totalValue: 0.0,
      assets: []
    });
  };

  const handleNewAsset = (newAssetData) => {
    setPortfolio(prevPortfolio => ({
      ...prevPortfolio,
      assets: [...prevPortfolio.assets, newAssetData],
    }));
  }

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const [portfolio, setPortfolio] = useState({
    id: "c18912e6-0a9f-414c-95c6-8a3217649a1b",
    portfolioName: "Dummy Portfolio",
    creationDate: "2025-07-15T12:00:00",
    totalValue: 0.0,
    balance: 1000.0,
    currency: "USD",
    assets: [
      {
        ticker: "AAPL",
        quantity: 10,
        purchasePrice: 150.0,
        purchaseTime: "2025-07-14T10:00:00",
        type: "Stock"
      },
      {
        ticker: "TSLA",
        quantity: 5,
        purchasePrice: 200.0,
        purchaseTime: "2025-07-14T10:00:00",
        type: "Stock"
      }
    ]
  });

  useEffect(() => {
    console.log('Portfolio updated:', portfolio);
    if (!portfolio || !portfolio.assets || portfolio.assets.length === 0) {
      return;
    }

    const fetchValue = async () => {
      console.log("useEffect triggered, portfolio:", portfolio);
      try {
        console.log("Sending portfolio:", portfolio);
        const result = await getTotalValue(portfolio.id);
        console.log("Axios response:", result);
        setTotalValue(result.data.totalValue);
      } catch (err) {
        console.error("API error caught in App.js:", err);
        setError(true);
      }
    };

    fetchValue();
  }, [portfolio]);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const res = await fetch("http://localhost:8080/api/portfolio/my-portfolios", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch portfolios");
        const data = await res.json();
        console.log('Portfolios fetched:', data);
        setUserPortfolios(data);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      }
    }

    if (token) {
      fetchPortfolios();
    }
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
  
    if (token) {
      fetchProfile();
    }
  }, [token]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-darkBlue1 flex flex-col items-center justify-between p-6 text-black dark:text-white">
      <header className="bg-white dark:bg-darkBlue2 shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex-1 flex-grow">
      <h1 className="text-3xl font-bold w-1.2 text-center">
        📊 Your Portfolio
      </h1>
      </div>

        <div className="flex items-center space-x-3">
          {/* Static label */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none px-3 py-1 rounded-md
                      bg-accentBlue dark:bg-accentGreen font-semibold
                      text-black shadow-md
                      hover:brightness-110 transition"
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'} 
          </div>
        </div>
      </header>
      <main className="mt-9 p-6 w-full max-w-6xl bg-gray-100 dark:bg-darkBlue2 shadow-md rounded-lg">
        {/* ───────── if NOT logged in ───────── */}
        {!token && (
          <>
            {showSignup ? (
              <SignupForm onSignup={handleLogin} />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}
            <button
              onClick={() => setShowSignup(prev => !prev)}
              className="mt-2 text-blue-500 underline"
            >
              {showSignup ? "Already have an account? Log in" : "New user? Sign up"}
            </button>
          </>
        )}
  
        {/* ───────── if logged in ───────── */}
        {token && (
          <>
            <Dashboard />
            {error ? (
              <div className="text-red-500 text-center bg-red-100 dark:bg-red-900 p-4 rounded">
                Failed to reach portfolio value.
              </div>
            ) : totalValue === null ? (
              <div className="text-center text-lg">Loading...</div>
            ) : (
              <div className="min-h-screen bg-gray-50 dark:bg-darkBlue3 p-6 flex flex-col items-center mt-2 space-y-8">
                {/* summary */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue3 p-6 rounded-lg shadow-md mb-8">
                  <PortfolioSummary
                    portfolioName={portfolio.portfolioName}
                    totalValue={totalValue}
                  />
                </div>
  
                {/* assets */}
                <div className="w-full max-w-6xl bg-gray-100 dark:bg-darkBlue2 p-6 rounded-lg shadow-md mb-8">
                  <AssetList assets={portfolio.assets} />
                </div>
  
                {/* forms */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md mb-8">
                  <PortfolioForm onSubmit={handleNewPortfolio} />
                </div>
  
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md mb-8">
                  <AssetForm portfolios={userPortfolios} onSubmit={handleNewAsset} />
                </div>
  
                {/* ETF viewer */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md mb-8">
                  <StockViewer token={token} />
                </div>
  
                {/* user profile */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md mb-8">
                  <UserProfile token={token} />
                </div>
  
                {/* optional logout button */}
                <button
                  className="mt-4 px-4 py-2 bg-accentBlue hover:bg-accentGreen text-white rounded"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </>
        )}
      </main>
  
      <Footer />
    </div>
  );
}

export default App;