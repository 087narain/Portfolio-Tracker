import React, { useState } from 'react';

function SignupForm({ onSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Signup failed. Please try again.');
            }
    
            const data = await response.json();  
            localStorage.setItem('token', data.token); 
            onSignup(data.token);
        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Make an account:</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-2 w-full"
            required
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
            Finish Signup
        </button>
    </form>
    );
}

export default SignupForm;