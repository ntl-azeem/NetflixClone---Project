'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', bio: '', avatar: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    axios
      .get('http://localhost:3000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({
          name: res.data.name || '',
          bio: res.data.bio || '',
          avatar: res.data.avatar || '',
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.patch(
        'http://localhost:3000/users/me',
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Profile updated!');
      setUser(res.data);
    } catch (err) {
      setMessage('❌ Update failed: ' + (err.response?.data?.message || 'Error'));
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Bio</label>
          <textarea
            className="form-control"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Avatar URL</label>
          <input
            className="form-control"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>

      {form.avatar && (
        <div className="mt-4">
          <img
            src={form.avatar}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-circle border"
          />
        </div>
      )}
    </div>
  );
}
