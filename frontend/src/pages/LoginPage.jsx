import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (action) => {
    setError('');
    if (!username || !email) {
      setError('Please enter both username and email.');
      return;
    }
    // Mock login/signup action
    onLogin({ username, email });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleSubmit('login')}
          >
            Login
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleSubmit('signup')}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
