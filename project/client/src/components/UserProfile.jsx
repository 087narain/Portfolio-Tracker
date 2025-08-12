import React, { useEffect, useState } from 'react';

function UserProfile({ token }) {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user profile.');
            }
            return response.json();
        })
        .then(data => {
            setUserProfile(data);
            setUsername(data.username);
        })
        .catch(err => setError(err.message));
    }, [token]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }

            const updatedProfile = await response.json();
            setUserProfile(updatedProfile);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8080/api/user/profile`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="user-profile w-full mx-auto p-6 bg-gray-100 dark:bg-darkBlue2 rounded-lg shadow-md text-white">
            <h2 className="text-3xl text-black text-center dark:text-white font-bold mb-6">User Profile</h2>
            
            <label className="block mb-2 text-black dark:text-gray-300 font-semibold">Username:</label>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded border border-gray-600 bg-gray-100 dark:bg-darkBlue3 mb-6 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accentBlue"
            />
            
            <div className="flex justify-start space-x-4">
                <button 
                onClick={handleUpdate} 
                className="bg-accentBlue hover:bg-accentGreen transition-colors px-6 py-3 rounded font-semibold"
                >
                Update
                </button>
                <button 
                onClick={handleDelete} 
                className="text-red-500 hover:text-red-600 transition-colors font-semibold"
                >
                Delete Account
                </button>
            </div>
        </div>
    );
}

export default UserProfile;