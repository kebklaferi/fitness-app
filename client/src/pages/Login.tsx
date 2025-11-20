import React, { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/login", { email, password });

      if (res.data.token && res.data.user) {
        login(res.data.token, res.data.user);
        navigate("/profil");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-full max-w-xs p-6 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">Prijava</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Geslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}
