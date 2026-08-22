export default function PhoneDigits({
  number,
  size = "md",
}: {
  number: string;
  size?: "sm" | "md" | "lg";
}) {
const sizes = {
  sm: "text-lg gap-1.5",
  md: "text-2xl gap-2",
  lg: "text-3xl sm:text-4xl gap-2",
} as const;

  const groups = number.split("-");

  return (
    <span className={`number-digits inline-flex items-baseline font-mono font-semibold text-ink ${sizes[size]}`}>
      {groups.map((g, i) => (
        <span key={i} className="inline-flex items-baseline">
          <span>{g}</span>
          {i < groups.length - 1 && (
            <span className="mx-1 text-gold-500 opacity-70">&middot;</span>
          )}
        </span>
      ))}
    </span>
  );
}
