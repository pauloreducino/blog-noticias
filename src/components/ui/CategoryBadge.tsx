interface CategoryBadgeProps {
  name: string;
  color: string;
  size?: "sm" | "md";
}

export function CategoryBadge({ name, color, size = "md" }: CategoryBadgeProps) {
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";
  return (
    <span
      className={`font-mono ${textSize} font-semibold tracking-wider uppercase px-2 py-1 rounded border`}
      style={{
        color,
        borderColor: color + "60",
        backgroundColor: color + "15",
      }}
    >
      {name}
    </span>
  );
}
