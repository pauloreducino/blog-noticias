interface SectionHeaderProps {
  label: string;
  title: string;
  accentColor?: string;
  count?: number;
}

export function SectionHeader({ label, title, accentColor = "bg-cyan", count }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`w-1 h-6 ${accentColor} rounded-full`} />
      <div>
        <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted">{label}</p>
        <h2 className="font-headline font-bold text-text-primary text-2xl -mt-0.5">
          {title}
          {count !== undefined && (
            <span className="font-mono text-[11px] text-text-muted ml-2 font-normal">({count})</span>
          )}
        </h2>
      </div>
    </div>
  );
}
