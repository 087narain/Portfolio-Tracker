import React, { useEffect, useState } from 'react';

function UserProfile({ token }) {
    const [userProfile, setUserProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
        .catch(err => setErrorMessage(err.message));
    }, [token]);

    const handleUpdate = async () => {

        if (!username.trim()) {
            setErrorMessage('Username cannot be empty.');
            return;
        }

        if (username.length < 3 || username.length > 20) {
            setErrorMessage('Username must be between 3 and 20 characters long.');
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setErrorMessage('Username can only contain letters, numbers, and underscores.');
            return;
        }

        setErrorMessage('');

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
            setUserProfile(updatedProfile.user);
            localStorage.setItem('token', updatedProfile.token);
            setSuccessMessage('Profile updated successfully!');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/profile`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete account.');
            }

            setSuccessMessage('Account deleted successfully!');
            localStorage.removeItem('token');
            setTimeout(() => {
                window.location.href = '/login'; 
            }, 1500);
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

    return (
        <>
          {successMessage && (
            <div className="mb-4 bg-green-600 text-white p-3 rounded shadow">
              {successMessage}
            </div>
          )}
      
          {errorMessage && (
            <div className="mb-4 bg-red-600 text-white p-3 rounded shadow">
              {errorMessage}
            </div>
          )}
      
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
                onClick={() => setShowConfirmModal(true)}  // open modal here
                className="text-red-500 hover:text-red-600 transition-colors font-semibold"
              >
                Delete Account
              </button>
            </div>
          </div>
      
          {/* Confirmation Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full text-center">
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowConfirmModal(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
}

export default UserProfile;