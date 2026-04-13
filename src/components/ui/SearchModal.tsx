"use client";
import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-base/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex items-center gap-3 px-4 border-b border-white/5">
          <svg className="w-5 h-5 text-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
              if (e.key === "Escape") onClose();
            }}
            className="flex-1 bg-transparent py-4 text-text-primary placeholder:text-text-muted font-body text-base outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-text-muted hover:text-text-primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="p-4">
          <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">Categorias</p>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-elevated text-text-secondary hover:text-text-primary font-body text-sm transition-colors hover:bg-cyan/10"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 bg-elevated border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-muted">Enter para buscar · Esc para fechar</span>
          {searchQuery && (
            <Link href={`/busca?q=${encodeURIComponent(searchQuery)}`} className="font-mono text-[11px] text-cyan hover:underline">
              Ver todos os resultados →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
