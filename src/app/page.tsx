'use client';

import { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  amount: number;
  newTotal: number;
  reason?: string;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('fml-username');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchCounter(savedUsername);
    }
  }, []);

  const fetchCounter = async (user: string) => {
    try {
      const response = await fetch(
        `/api/counter?username=${encodeURIComponent(user)}`
      );
      const data = await response.json();
      if (response.ok) {
        setCounter(data.count);
        setLog(data.log || []);
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
          reason: reason.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCounter(data.count);
        setReason(''); // Clear reason after successful increment
        // Refresh the log after incrementing
        fetchCounter(username.trim());
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
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800 mb-4">
              {counter}
            </div>
            <p className="text-gray-600 mb-6">Current FML count</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => incrementCounter(1)}
              disabled={loading}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              +1
            </button>

            <button
              onClick={() => incrementCounter(5)}
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              +5
            </button>

            <button
              onClick={() => incrementCounter(10)}
              disabled={loading}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              +10
            </button>
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reason (optional)
            </label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you feeling this way?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          {log.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {log.map((entry, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-md text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-semibold ${
                            entry.amount === 1
                              ? 'text-yellow-600'
                              : entry.amount === 5
                                ? 'text-orange-600'
                                : 'text-red-600'
                          }`}
                        >
                          +{entry.amount}
                        </span>
                        <span className="text-gray-600">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-gray-800 font-medium">
                        Total: {entry.newTotal}
                      </span>
                    </div>
                    {entry.reason && (
                      <div className="mt-1 text-gray-700 italic">
                        {entry.reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
