'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/forgot-password', { email });
      setToken(res.data.resetToken); // For testing
      setMessage('Reset token generated.');
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || 'Unknown'));
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleRequestReset}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary">Request Reset</button>
      </form>
      {token && (
        <div className="mt-3">
          <strong>Testing Token:</strong> {token}
        </div>
      )}
    </div>
  );
}
