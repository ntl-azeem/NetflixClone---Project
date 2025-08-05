'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/reset-password', {
        token,
        password,
      });
      setMessage('Password reset successful!');
    } catch (err) {
      setMessage('Reset failed: ' + (err.response?.data?.message || 'Unknown'));
    }
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleReset}>
        <input
          className="form-control mb-3"
          placeholder="Reset token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
}
