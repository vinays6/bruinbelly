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
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#FFFBF8' }}>
      <div className="w-full max-w-md px-4 pt-12 pb-8">
        <div className="mb-8 animate-fade-up">
          <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">🐻 UCLA Dining</p>
          <h1 className="font-display text-3xl font-bold text-stone-800 leading-tight">
            Welcome to<br />
            <span className="text-orange-500">BruinBites</span>
          </h1>
          <p className="text-sm text-stone-400 mt-2">Log in to rate dishes and track what Bruins are eating.</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5 animate-fade-up delay-1">
          <label htmlFor="username" className="text-sm font-semibold text-stone-700 block mb-2">
            Username
          </label>
          <input
            id="username"
            className="w-full px-3 py-2.5 mb-4 border border-stone-200 rounded-2xl text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="email" className="text-sm font-semibold text-stone-700 block mb-2">
            Email
          </label>
          <input
            id="email"
            className="w-full px-3 py-2.5 mb-4 border border-stone-200 rounded-2xl text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
            type="email"
            placeholder="email@ucla.edu"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {error && <div className="mb-3 text-rose-500 text-sm">{error}</div>}

          <div className="flex gap-2">
            <button
              className="flex-1 bg-orange-500 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold active:scale-[0.98] transition-transform"
              onClick={() => handleSubmit('login')}
            >
              Login
            </button>
            <button
              className="flex-1 bg-white border border-stone-200 text-stone-700 px-4 py-2.5 rounded-2xl text-sm font-semibold active:scale-[0.98] transition-transform"
              onClick={() => handleSubmit('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
