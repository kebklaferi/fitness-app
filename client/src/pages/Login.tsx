import React, { useState } from 'react';
import axios from '../axios/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/login', { username, password });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setSuccess(res.data.message || 'Login successful!');
        
        // Optionally: redirect after a short delay
        setTimeout(() => {
          navigate('/dashboard'); // change to your desired route
        }, 1000);
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-full max-w-xs p-6 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">Prijava</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Uporabniško ime"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Geslo"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Prijava
          </button>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        </form>
      </div>
    </div>
  );
}
