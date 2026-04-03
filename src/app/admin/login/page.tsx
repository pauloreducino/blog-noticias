"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate brief processing
    await new Promise((r) => setTimeout(r, 400));

    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Usuário ou senha incorretos.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-cyan flex items-center justify-center mb-4 shadow-lg shadow-cyan/20">
            <span className="font-headline font-bold text-xl text-black">SL</span>
          </div>
          <h1 className="font-headline font-bold text-2xl text-text-primary">
            Painel Admin
          </h1>
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mt-1">
            São Luís em Foco
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-white/5 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label
              htmlFor="username"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoComplete="username"
              className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/25 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/25 transition-colors"
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-news/10 border border-red-news/20 rounded-lg">
              <p className="font-body text-sm text-red-news">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center font-mono text-[10px] text-text-muted mt-6">
          Acesso restrito a administradores
        </p>
      </div>
    </div>
  );
}
