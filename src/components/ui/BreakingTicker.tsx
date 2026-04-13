"use client";

interface BreakingTickerProps {
  temperature: string;
  onWeatherClick: () => void;
  items: string[];
}

export function BreakingTicker({ temperature, onWeatherClick, items }: BreakingTickerProps) {
  return (
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
            <button
              onClick={onWeatherClick}
              className="font-mono text-[11px] text-cyan emoji-color hover:text-cyan/80 transition-colors cursor-pointer underline-offset-2 hover:underline shrink-0"
            >
              {temperature
                ? `Temperatura em São Luís: ${temperature} — ver previsão`
                : "Carregando temperatura..."}
              <span className="mx-4 text-cyan opacity-50" aria-hidden="true">·</span>
            </button>
            {items.map((item, i) => (
              <span key={i} className="font-mono text-[11px] text-text-secondary emoji-color">
                {item}
                <span className="mx-4 text-cyan opacity-50" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
