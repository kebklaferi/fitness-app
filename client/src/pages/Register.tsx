import React, { useState } from 'react';
import axios from '../axios/axios';

interface UserI {
  username: string;
  password: string;
  role: 'uporabnik' | 'trener' | 'admin';
}

export default function RegisterPage() {
  const [currentUser, setCurrentUser] = useState<UserI>({ username: '', password: '', role: 'uporabnik' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/register', currentUser);
      setSuccess('Registration successful!');
      // Optionally redirect or show success
    } catch (err: any) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
  <div className="flex w-full max-w-3xl bg-white rounded-xl overflow-hidden">
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Registracija</h1>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Uporabniško ime"
              value={currentUser.username}
              onChange={e => setCurrentUser({ ...currentUser, username: e.target.value })}
              required
              className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Geslo"
              value={currentUser.password}
              onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
              required
              className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-4 items-center">
              <label className="font-medium">Vloga:</label>
              <select value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value as 'uporabnik' | 'trener' | 'admin' })} className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="uporabnik">Uporabnik</option>
                <option value="trener">Trener</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Registracija</button>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          </form>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center bg-blue-50">
          <img src="https://placehold.co/300x300?text=Register+Image" alt="Register" className="object-cover h-64 w-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
