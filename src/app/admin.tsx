"use client";
import { useState } from "react";

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "adminpass") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-hot-pink-gradient select-none">
        <div className="bg-white/10 border border-white/30 rounded-2xl p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-white/80">Welcome, admin! (This is a placeholder dashboard.)</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-hot-pink-gradient select-none">
      <form onSubmit={handleSubmit} className="bg-white/10 border border-white/30 rounded-2xl p-8 shadow-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Login</h1>
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter admin password"
          className="mb-4 px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button type="submit" className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200">Login</button>
        {error && <p className="text-red-400 mt-3">{error}</p>}
      </form>
    </main>
  );
} 