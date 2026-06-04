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
        <div className="mb-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
            Secure Access
          </p>
          <h1 className="mt-3 text-3xl font-heading font-bold text-primary">
            Admin Login
          </h1>
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
                placeholder="name@example.com"
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
