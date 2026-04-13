"use client";
import type { CurrentWeather, DayForecast } from "@/hooks/useWeather";

interface WeatherModalProps {
  onClose: () => void;
  currentWeather: CurrentWeather | null;
  forecast: DayForecast[];
  error: boolean;
}

export function WeatherModal({ onClose, currentWeather, forecast, error }: WeatherModalProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-base/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div>
            <p className="font-headline font-bold text-text-primary text-base">Previsão do Tempo</p>
            <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mt-0.5">
              São Luís — Maranhão
            </p>
          </div>
          <button
            onClick={onClose}
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
                <div className="text-5xl leading-none emoji-color mb-1">{currentWeather.emoji}</div>
                <p className="font-body text-sm text-text-muted capitalize mt-2">{currentWeather.description}</p>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-text-primary text-5xl leading-none">{currentWeather.temp}°</p>
                <p className="font-mono text-[11px] text-text-muted mt-1">Sensação {currentWeather.feelsLike}°C</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-elevated rounded-xl px-4 py-3">
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-1">Umidade</p>
                <p className="font-headline font-bold text-text-primary text-xl">{currentWeather.humidity}%</p>
              </div>
              <div className="bg-elevated rounded-xl px-4 py-3">
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-1">Vento</p>
                <p className="font-headline font-bold text-text-primary text-xl">{currentWeather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="px-5 py-8 flex flex-col items-center gap-2 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="font-body text-sm text-text-muted">Não foi possível carregar o clima.</p>
            <p className="font-mono text-[10px] text-text-muted">Chaves novas do OpenWeather levam até 2h para ativar.</p>
          </div>
        ) : (
          <div className="px-5 py-8 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-cyan animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="font-mono text-[11px] text-text-muted">Carregando...</span>
          </div>
        )}

        {/* Próximos dias */}
        {forecast.length > 0 && (
          <div className="border-t border-white/5 px-5 py-4">
            <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">Próximos dias</p>
            <div className="space-y-2">
              {forecast.map((day, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <span className="font-mono text-[12px] font-medium text-text-secondary w-24">{day.label}</span>
                  <span className="text-lg emoji-color">{day.emoji}</span>
                  <span className="font-body text-xs text-text-muted flex-1 text-center px-2 truncate">{day.description}</span>
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
          <p className="font-mono text-[10px] text-text-muted text-center">Fonte: OpenWeather · Atualizado agora</p>
        </div>
      </div>
    </div>
  );
}
