"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

const navCategories = categories.slice(0, 6);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shortcut, setShortcut] = useState("Ctrl+K");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navigator.platform.toLowerCase().includes("mac")) {
      setShortcut("⌘K");
    }
  }, []);

  // Buscar temperatura em tempo real
  useEffect(() => {
    fetch("https://wttr.in/S%C3%A3o%20Lu%C3%ADs?format=3")
      .then((response) => response.text())
      .then((data) => {
        // Garante que removemos qualquer prefixo "<local>: " (ex: "São Luís: ")
        const weather = data.includes(":")
          ? data.split(":").slice(1).join(":").trim()
          : data.trim();
        setTemperature(weather);
      })
      .catch(() => {
        // Fallback
        setTemperature("🌤️ +38°C");
      });
  }, []);

  // Lista de notícias breaking (com temperatura dinâmica)
  const breakingNews = [
    temperature
      ? `Temperatura atual em São Luís: ${temperature}`
      : "Carregando temperatura...",
    "Governo do MA anuncia plano habitacional com 10 mil unidades",
    "Sampaio Corrêa anuncia três reforços para a Série C",
    "Startup maranhense levanta R$ 5 milhões em rodada seed",
    "Lençóis Maranhenses recebe nova certificação internacional",
    "UFMA abre inscrições para 14 novos cursos gratuitos",
  ];

  return (
    <>
      {/* Breaking news ticker */}
      <div className="bg-red-news/10 border-b border-red-news/20 overflow-hidden">
        <div className="flex items-center">
          <div className="shrink-0 bg-red-news px-3 py-1.5 flex items-center gap-2 z-10">
            <span className="animate-live-pulse w-2 h-2 rounded-full bg-white inline-block" />
            <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase whitespace-nowrap">
              Última Hora
            </span>
          </div>
          <div className="ticker-track overflow-hidden flex-1">
            <div className="ticker-inner flex gap-12 animate-ticker whitespace-nowrap py-1.5 px-4">
              {breakingNews.map((item, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] text-text-secondary emoji-color"
                >
                  {item}
                  <span className="mx-4 text-cyan opacity-50">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base/92 backdrop-blur-xl border-b border-cyan/15 shadow-lg shadow-black/20"
            : "bg-base/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 rounded bg-cyan flex items-center justify-center">
                <span className="font-headline font-bold text-base text-xs text-base">
                  SL
                </span>
              </div>
              <div className="leading-none">
                <div className="font-headline font-bold text-text-primary text-lg tracking-tight group-hover:text-cyan transition-colors">
                  São Luís
                </div>
                <div className="font-body text-text-muted text-[10px] tracking-widest uppercase -mt-0.5">
                  em Foco
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Categorias principais"
            >
              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="px-3 py-2 font-mono text-[11px] font-medium text-text-muted hover:text-text-primary uppercase tracking-wider transition-colors rounded-md hover:bg-surface"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-white/5 hover:border-cyan/30 transition-all text-text-muted hover:text-text-primary"
                aria-label={`Abrir busca (${shortcut})`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:block font-mono text-[10px] tracking-widest">
                  {shortcut}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-text-muted hover:text-text-primary"
                aria-label="Abrir menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface border-l border-white/5 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="font-headline font-bold text-text-primary text-lg">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-elevated transition-colors"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="font-body font-medium text-text-secondary">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4">
          <div
            className="absolute inset-0 bg-base/85 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center gap-3 px-4 border-b border-white/5">
              <svg
                className="w-5 h-5 text-cyan shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Buscar notícias de São Luís..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="flex-1 bg-transparent py-4 text-text-primary placeholder:text-text-muted font-body text-base outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-text-muted hover:text-text-primary"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">
                Categorias
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-elevated text-text-secondary hover:text-text-primary font-body text-sm transition-colors hover:bg-cyan/10"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-4 py-3 bg-elevated border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-text-muted">
                Enter para buscar · Esc para fechar
              </span>
              {searchQuery && (
                <Link
                  href={`/busca?q=${encodeURIComponent(searchQuery)}`}
                  className="font-mono text-[11px] text-cyan hover:underline"
                >
                  Ver todos os resultados →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
