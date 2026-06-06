import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Variant = "dark" | "light" | "gold";

interface Props {
  title: string;
  subtitle?: string;
  variant?: Variant;
  breadcrumb?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, variant = "dark", breadcrumb, children }: Props) {
  const cls =
    variant === "dark"
      ? "bg-navy text-white"
      : variant === "gold"
        ? "bg-gold-pale text-navy"
        : "bg-off-white text-navy border-b border-border";

  return (
    <section className={`${cls} pt-32 pb-20 md:pt-44 md:pb-28 relative overflow-hidden`}>
      {variant === "dark" && (
        <>
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,#F0C040_0%,transparent_45%),radial-gradient(circle_at_80%_80%,#4B0082_0%,transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 hairline-gold" />
        </>
      )}
      <div className="container-prose relative">
        {breadcrumb && (
          <nav className="text-xs uppercase tracking-[0.25em] mb-6 opacity-70">
            <Link to="/" className="hover:opacity-100">Home</Link>
            <span className="mx-2">/</span>
            <span className={variant === "dark" ? "text-gold-light" : "text-gold"}>
              {breadcrumb}
            </span>
          </nav>
        )}
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-6 text-lg md:text-xl max-w-2xl ${
            variant === "dark" ? "text-white/75" : "text-muted-foreground"
          }`}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
