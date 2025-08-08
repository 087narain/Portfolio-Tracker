import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(errText || 'Login failed. Please check your credentials.');
            }

            const token = await res.text(); // expect raw string
            localStorage.setItem('token', token);
            onLogin(token);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-darkBlue2 rounded-lg shadow-md p-6 border border-gray-300 dark:border-darkBlue3 text-gray-900 dark:text-white mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-accentBlue">Login</h2>
      
          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}
      
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 rounded border border-gray-300 dark:border-darkBlue3 bg-gray-100 dark:bg-darkBlue1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 rounded border border-gray-300 dark:border-darkBlue3 bg-gray-100 dark:bg-darkBlue1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accentGreen"
            />
            <button
              type="submit"
              className="w-full bg-accentBlue hover:bg-accentGreen text-white p-3 rounded font-semibold transition-colors"
            >
              Login
            </button>
          </form>
        </div>
    );
}

export default LoginForm;