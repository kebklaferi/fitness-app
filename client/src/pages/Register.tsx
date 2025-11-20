import React, { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

interface UserRegisterI {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'uporabnik' | 'trener' | 'admin';
}

export default function RegisterPage() {
  const [user, setUser] = useState<UserRegisterI>({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "uporabnik",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/register", user);
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
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
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
              className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Telefonska številka"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              required
              className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Geslo"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-4 items-center">
              <label className="font-medium">Vloga:</label>
              <select
                value={user.role}
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value as 'uporabnik' | 'trener' | 'admin' })
                }
                className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="uporabnik">Uporabnik</option>
                <option value="trener">Trener</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Registracija
            </button>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          </form>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center bg-blue-50">
          <img
            src="https://placehold.co/300x300?text=Register+Image"
            alt="Register"
            className="object-cover h-64 w-64 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
