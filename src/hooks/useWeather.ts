"use client";
import { useState, useEffect } from "react";

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  emoji: string;
}

export interface DayForecast {
  label: string;
  emoji: string;
  min: number;
  max: number;
  description: string;
}

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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

export function useWeather() {
  const [temperature, setTemperature] = useState("");
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      setTemperature("🌤️ 38°C");
      return;
    }

    const base = "https://api.openweathermap.org/data/2.5";
    const params = `q=S%C3%A3o+Lu%C3%ADs,BR&appid=${apiKey}&units=metric&lang=pt_br`;

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
          windSpeed: Math.round(d.wind.speed * 3.6),
          description:
            d.weather[0].description.charAt(0).toUpperCase() +
            d.weather[0].description.slice(1),
          emoji,
        });
      })
      .catch((err) => {
        console.warn("[OpenWeather] Erro ao buscar clima atual:", err.message);
        setTemperature("🌤️ 38°C");
        setError(true);
      });

    fetch(`${base}/forecast?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
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
            const midId = ids[Math.floor(ids.length / 2)];
            const midDesc = descriptions[Math.floor(descriptions.length / 2)];
            return {
              label: DAY_NAMES[date.getDay()],
              emoji: weatherEmoji(midId),
              min: Math.round(Math.min(...temps)),
              max: Math.round(Math.max(...temps)),
              description: midDesc.charAt(0).toUpperCase() + midDesc.slice(1),
            };
          });

        setForecast(days);
      })
      .catch(() => {});
  }, []);

  return { temperature, currentWeather, forecast, error };
}
