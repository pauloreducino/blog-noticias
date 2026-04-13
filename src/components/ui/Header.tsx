"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { categories } from "@/data/categories";
import { useWeather } from "@/hooks/useWeather";
import { BreakingTicker } from "./BreakingTicker";
import { MobileMenu } from "./MobileMenu";

const SearchModal = dynamic(() => import("./SearchModal").then((m) => m.SearchModal), { ssr: false });
const WeatherModal = dynamic(() => import("./WeatherModal").then((m) => m.WeatherModal), { ssr: false });

const navCategories = categories.slice(0, 6);

const BREAKING_NEWS = [
  "Governo do MA anuncia plano habitacional com 10 mil unidades",
  "Sampaio Corrêa anuncia três reforços para a Série C",
  "Startup maranhense levanta R$ 5 milhões em rodada seed",
  "Lençóis Maranhenses recebe nova certificação internacional",
  "UFMA abre inscrições para 14 novos cursos gratuitos",
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [shortcut, setShortcut] = useState("Ctrl+K");

  const { temperature, currentWeather, forecast, error } = useWeather();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navigator.platform.toLowerCase().includes("mac")) setShortcut("⌘K");
  }, []);

  return (
    <>
      <BreakingTicker
        temperature={temperature}
        onWeatherClick={() => setWeatherOpen(true)}
        items={BREAKING_NEWS}
      />

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
                <span className="font-headline font-bold text-base text-xs">SL</span>
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
            <nav className="hidden lg:flex items-center gap-1" aria-label="Categorias principais">
              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="px-3 py-2 font-mono text-[11px] font-medium text-text-muted hover:text-text-primary uppercase tracking-wider transition-colors rounded-md hover:bg-surface"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/autores"
                className="px-3 py-2 font-mono text-[11px] font-medium text-text-muted hover:text-text-primary uppercase tracking-wider transition-colors rounded-md hover:bg-surface"
              >
                Redação
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-white/5 hover:border-cyan/30 transition-all text-text-muted hover:text-text-primary"
                aria-label={`Abrir busca (${shortcut})`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:block font-mono text-[10px] tracking-widest">{shortcut}</span>
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-text-muted hover:text-text-primary"
                aria-label="Abrir menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {weatherOpen && (
        <WeatherModal
          onClose={() => setWeatherOpen(false)}
          currentWeather={currentWeather}
          forecast={forecast}
          error={error}
        />
      )}
    </>
  );
}
