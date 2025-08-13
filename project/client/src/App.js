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
    const newPortfolio = {
      ...newPortfolioData,
      id: crypto.randomUUID(),
      portfolioName: newPortfolioData.portfolioName || 'New Portfolio',
      creationDate: new Date().toISOString(),
      totalValue: 0.0,
      assets: [] 
    };
    setUserPortfolios(prev => [...prev, newPortfolio]);
  };

  const handleNewAsset = (portfolioId, newAssetData) => {
    setUserPortfolios(prev =>
      prev.map(p =>
        p.id === portfolioId
          ? { ...p, assets: [...(p.assets || []), newAssetData] }
          : p
      )
    );
  };

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    if (userPortfolios.length === 0) return;
  
    const fetchValues = async () => {
      try {
        const updatedPortfolios = await Promise.all(
          userPortfolios.map(async (p) => {
            const result = await getTotalValue(p.id);
            return { ...p, totalValue: result.data.totalValue };
          })
        );
        setUserPortfolios(updatedPortfolios);
      } catch (err) {
        console.error("Error fetching portfolio values:", err);
        setError(true);
      }
    };
  
    fetchValues();
  }, [userPortfolios.length]);

  useEffect(() => {
    async function fetchPortfolios() {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8080/api/portfolio/my-portfolios", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch portfolios");
  
        const data = await res.json();
  
        // Ensure all portfolios have an assets array
        const normalized = data.map(p => ({
          ...p,
          assets: p.assets || p.allAssets || []  // handle backend field
        }));
  
        setUserPortfolios(normalized);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
        setError(true);
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
            ) : userPortfolios.length === 0 ? (
              <div className="text-center text-lg">You have no portfolios yet.</div>
            ) : (
              <div className="min-h-screen bg-gray-50 dark:bg-darkBlue3 p-6 flex flex-col items-center mt-2 space-y-8">
                {userPortfolios.map(p => (
                  <div key={p.id} className="w-full max-w-6xl bg-white dark:bg-darkBlue3 p-6 rounded-lg shadow-md">
                    {/* Portfolio summary */}
                    
                    <PortfolioSummary
                      portfolioName={p.portflioName}
                      totalValue={p.totalValue}
                      currency={p.currency || 'No currency selected.'}
                    />

                    {/* Assets */}
                    <AssetList assets={p.assets || []} />

                    {/* Forms to add new assets to this portfolio */}
                    <AssetForm
                      portfolios={[p]}  // pass only this portfolio to the form
                      onSubmit={(assetData) => handleNewAsset(p.id, assetData)}
                    />
                  </div>
                ))}

                {/* Form to create a new portfolio */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md">
                  <PortfolioForm onSubmit={handleNewPortfolio} />
                </div>

                {/* Stock viewer */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md">
                  <StockViewer token={token} />
                </div>

                {/* User profile */}
                <div className="w-full max-w-6xl bg-white dark:bg-darkBlue2 p-6 rounded-lg shadow-md">
                  <UserProfile token={token} />
                </div>

                {/* Logout button */}
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