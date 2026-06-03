import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authAPI.login(email, password);
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div className="login-background flex items-center justify-center px-4 py-10">
      <div className="login-card">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
            Administrator Access
          </p>
          <h1 className="mt-4 text-4xl font-heading font-bold text-primary">
            Admin Login
          </h1>
          <p className="mt-3 text-sm text-neutral-600 max-w-xl mx-auto">
            Sign in to manage staff, programs, media, notifications, and schedule data.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-neutral-700">
              Email address
              <input
                id="email"
                name="email"
                type="email"
                required
                className="login-field"
                placeholder="admin@ihyaussunnah.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block text-sm font-semibold text-neutral-700">
              Password
              <input
                id="password"
                name="password"
                type="password"
                required
                className="login-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3 text-base font-semibold"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;