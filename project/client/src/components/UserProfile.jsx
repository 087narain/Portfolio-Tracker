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
                body: JSON.stringify({ username: setUsername })
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
            window.location.reload(); 
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="user-profile">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <label className="block mb-2">Username:</label>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete} className="ml-4 text-red-500">Delete Account</button>
        </div>
    );
}

export default UserProfile;