"use client";
import Link from "next/link";
import { categories } from "@/data/categories";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface border-l border-white/5 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="font-headline font-bold text-text-primary text-lg">Menu</span>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-elevated transition-colors"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="font-body font-medium text-text-secondary">{cat.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
