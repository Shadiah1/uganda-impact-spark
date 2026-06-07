import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-08T08:00:00+03:00").getTime();

function diff() {
  const now = Date.now();
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function CountdownTimer({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const dark = variant === "dark";
  const cell =
    "flex flex-col items-center justify-center min-w-[78px] md:min-w-[110px] py-4 md:py-6 px-3 rounded-sm border " +
    (dark
      ? "border-gold/30 bg-white/[0.03] backdrop-blur"
      : "border-navy/15 bg-white");

  const items: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="flex gap-3 md:gap-4">
      {items.map(([label, value]) => (
        <div key={label} className={cell}>
          <span
            className={`font-display text-3xl md:text-5xl leading-none ${
              dark ? "text-gold-light" : "text-navy"
            }`}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span
            className={`mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] ${
              dark ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
