"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

const navCategories = categories.slice(0, 6);

interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  emoji: string;
}

interface DayForecast {
  label: string;
  emoji: string;
  min: number;
  max: number;
  description: string;
}

function weatherEmoji(id: number): string {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 400) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id === 801) return "🌤️";
  return "☁️";
}

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shortcut, setShortcut] = useState("Ctrl+K");
  const [temperature, setTemperature] = useState("");
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [weatherError, setWeatherError] = useState(false);

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

  // Buscar clima atual + previsão 5 dias
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      setTemperature("🌤️ 38°C");
      return;
    }

    const base = "https://api.openweathermap.org/data/2.5";
    const params = `q=S%C3%A3o+Lu%C3%ADs,BR&appid=${apiKey}&units=metric&lang=pt_br`;

    // Atual
    fetch(`${base}/weather?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        const temp = Math.round(d.main.temp);
        const emoji = weatherEmoji(d.weather[0].id);
        setTemperature(`${emoji} ${temp}°C`);
        setCurrentWeather({
          temp,
          feelsLike: Math.round(d.main.feels_like),
          humidity: d.main.humidity,
          windSpeed: Math.round(d.wind.speed * 3.6), // m/s → km/h
          description:
            d.weather[0].description.charAt(0).toUpperCase() +
            d.weather[0].description.slice(1),
          emoji,
        });
      })
      .catch((err) => {
        console.warn("[OpenWeather] Erro ao buscar clima atual:", err.message);
        setTemperature("🌤️ 38°C");
        setWeatherError(true);
      });

    // Previsão 5 dias (intervalos de 3h)
    fetch(`${base}/forecast?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        // Agrupa por dia (ignora hoje)
        const today = new Date().toDateString();
        const byDay: Record<string, { temps: number[]; ids: number[]; descriptions: string[] }> = {};

        for (const item of d.list) {
          const date = new Date(item.dt * 1000);
          const key = date.toDateString();
          if (key === today) continue;
          if (!byDay[key]) byDay[key] = { temps: [], ids: [], descriptions: [] };
          byDay[key].temps.push(item.main.temp);
          byDay[key].ids.push(item.weather[0].id);
          byDay[key].descriptions.push(item.weather[0].description);
        }

        const days: DayForecast[] = Object.entries(byDay)
          .slice(0, 5)
          .map(([dateStr, { temps, ids, descriptions }]) => {
            const date = new Date(dateStr);
            // Usa a condição do período da tarde (mais representativa)
            const midId = ids[Math.floor(ids.length / 2)];
            const midDesc = descriptions[Math.floor(descriptions.length / 2)];
            return {
              label: DAY_NAMES[date.getDay()],
              emoji: weatherEmoji(midId),
              min: Math.round(Math.min(...temps)),
              max: Math.round(Math.max(...temps)),
              description:
                midDesc.charAt(0).toUpperCase() + midDesc.slice(1),
            };
          });

        setForecast(days);
      })
      .catch(() => {});
  }, []);

  // Lista de notícias breaking
  const breakingNews = [
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
          <div className="shrink-0 bg-red-badge px-3 py-1.5 flex items-center gap-2 z-10">
            <span className="animate-live-pulse w-2 h-2 rounded-full bg-white inline-block" />
            <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase whitespace-nowrap">
              Última Hora
            </span>
          </div>
          <div className="ticker-track overflow-hidden flex-1">
            <div className="ticker-inner flex gap-12 animate-ticker whitespace-nowrap py-1.5 px-4">
              {/* Item de clima — clicável */}
              <button
                onClick={() => setWeatherOpen(true)}
                className="font-mono text-[11px] text-cyan emoji-color hover:text-cyan/80 transition-colors cursor-pointer underline-offset-2 hover:underline shrink-0"
              >
                {temperature
                  ? `Temperatura em São Luís: ${temperature} — ver previsão`
                  : "Carregando temperatura..."}
                <span className="mx-4 text-cyan opacity-50" aria-hidden="true">·</span>
              </button>

              {breakingNews.map((item, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] text-text-secondary emoji-color"
                >
                  {item}
                  <span className="mx-4 text-cyan opacity-50" aria-hidden="true">·</span>
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

      {/* Weather modal */}
      {weatherOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] px-4">
          <div
            className="absolute inset-0 bg-base/85 backdrop-blur-md"
            onClick={() => setWeatherOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header do modal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div>
                <p className="font-headline font-bold text-text-primary text-base">
                  Previsão do Tempo
                </p>
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mt-0.5">
                  São Luís — Maranhão
                </p>
              </div>
              <button
                onClick={() => setWeatherOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Fechar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Condições atuais */}
            {currentWeather ? (
              <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-5xl leading-none emoji-color mb-1">
                      {currentWeather.emoji}
                    </div>
                    <p className="font-body text-sm text-text-muted capitalize mt-2">
                      {currentWeather.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline font-bold text-text-primary text-5xl leading-none">
                      {currentWeather.temp}°
                    </p>
                    <p className="font-mono text-[11px] text-text-muted mt-1">
                      Sensação {currentWeather.feelsLike}°C
                    </p>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-elevated rounded-xl px-4 py-3">
                    <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-1">
                      Umidade
                    </p>
                    <p className="font-headline font-bold text-text-primary text-xl">
                      {currentWeather.humidity}%
                    </p>
                  </div>
                  <div className="bg-elevated rounded-xl px-4 py-3">
                    <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-1">
                      Vento
                    </p>
                    <p className="font-headline font-bold text-text-primary text-xl">
                      {currentWeather.windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>
            ) : weatherError ? (
              <div className="px-5 py-8 flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">⚠️</span>
                <p className="font-body text-sm text-text-muted">
                  Não foi possível carregar o clima.
                </p>
                <p className="font-mono text-[10px] text-text-muted">
                  Chaves novas do OpenWeather levam até 2h para ativar.
                </p>
              </div>
            ) : (
              <div className="px-5 py-8 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-cyan animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                <span className="font-mono text-[11px] text-text-muted">Carregando...</span>
              </div>
            )}

            {/* Próximos dias */}
            {forecast.length > 0 && (
              <div className="border-t border-white/5 px-5 py-4">
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">
                  Próximos dias
                </p>
                <div className="space-y-2">
                  {forecast.map((day, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1.5"
                    >
                      <div className="flex items-center gap-3 w-24">
                        <span className="font-mono text-[12px] font-medium text-text-secondary">
                          {day.label}
                        </span>
                      </div>
                      <span className="text-lg emoji-color">{day.emoji}</span>
                      <span className="font-body text-xs text-text-muted flex-1 text-center px-2 truncate">
                        {day.description}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[12px]">
                        <span className="text-text-primary font-bold">{day.max}°</span>
                        <span className="text-text-muted">{day.min}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="px-5 py-3 bg-elevated border-t border-white/5">
              <p className="font-mono text-[10px] text-text-muted text-center">
                Fonte: OpenWeather · Atualizado agora
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
