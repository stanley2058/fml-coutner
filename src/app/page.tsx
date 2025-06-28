'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('fml-username');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchCounter(savedUsername);
    }
  }, []);

  const fetchCounter = async (user: string) => {
    try {
      const response = await fetch(`/api/counter?username=${encodeURIComponent(user)}`);
      const data = await response.json();
      if (response.ok) {
        setCounter(data.count);
      }
    } catch (error) {
      console.error('Error fetching counter:', error);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem('fml-username', newUsername);
    if (newUsername) {
      fetchCounter(newUsername);
    } else {
      setCounter(0);
    }
  };

  const incrementCounter = async (amount: number) => {
    if (!username.trim()) {
      alert('Please enter a username first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          amount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCounter(data.count);
      } else {
        alert('Error updating counter: ' + data.error);
      }
    } catch (error) {
      console.error('Error incrementing counter:', error);
      alert('Error updating counter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">FML Counter</h1>
          <p className="text-gray-600">Track how bad you&apos;re feeling</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800 mb-4">{counter}</div>
            <p className="text-gray-600 mb-6">Current FML count</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => incrementCounter(1)}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors"
            >
              {loading ? 'Updating...' : '+1 (Mildly annoyed)'}
            </button>
            
            <button
              onClick={() => incrementCounter(5)}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors"
            >
              {loading ? 'Updating...' : '+5 (Pretty frustrated)'}
            </button>
            
            <button
              onClick={() => incrementCounter(10)}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors"
            >
              {loading ? 'Updating...' : '+10 (Life is terrible)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
