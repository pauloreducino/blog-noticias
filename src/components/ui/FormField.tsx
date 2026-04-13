interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ id, label, error, required, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
        {label} {required && <span className="text-red-news">*</span>}
      </label>
      {children}
      {error && <p className="font-body text-xs text-red-news mt-1">{error}</p>}
    </div>
  );
}

export function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 bg-surface border rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none transition-all ${
    hasError
      ? "border-red-news/50 focus:border-red-news focus:ring-1 focus:ring-red-news/25"
      : "border-white/5 focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
  }`;
}
